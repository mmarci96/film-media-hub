package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"server/internal/database"
	"server/internal/models"

	"github.com/gin-gonic/gin"
)

type TMDBHandler struct {
	db         *database.Database
	tmdbAPIKey string
}

type TMDBResponse struct {
	Page         int                `json:"page"`
	Results      []models.TMDBMovie `json:"results"`
	TotalPages   int                `json:"total_pages"`
	TotalResults int                `json:"total_results"`
}

func NewTMDBHandler(db *database.Database, apiKey *string) *TMDBHandler {
	return &TMDBHandler{
		db:         db,
		tmdbAPIKey: *apiKey,
	}
}

func (h *TMDBHandler) fetchDetailsByID(id string, mediaType string) (*map[string]any, error) {
	url := fmt.Sprintf("%s/%s/%s?language=en-US", getTmdbPrefix(), mediaType, id)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Println("Failed to create request:", err)
		return nil, err
	}

	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", "Bearer "+h.tmdbAPIKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Request error:", err)
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("TMDB API error: %s", string(body))
		return nil, fmt.Errorf("TMDB API returned status: %d", resp.StatusCode)
	}

	var tmdbResponse map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&tmdbResponse); err != nil {
		log.Println("JSON decoding error:", err)
		return nil, err
	}

	return &tmdbResponse, nil
}

func (h *TMDBHandler) fetchFromTMDB(url string) (*TMDBResponse, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", "Bearer "+h.tmdbAPIKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("TMDB API returned status: %d", resp.StatusCode)
	}

	var tmdbResponse TMDBResponse
	if err := json.NewDecoder(resp.Body).Decode(&tmdbResponse); err != nil {
		return nil, err
	}
	return &tmdbResponse, nil
}

func (h *TMDBHandler) FetchMediaByID(c *gin.Context) {
	mediaType := c.Param("type")
	mediaId := c.Param("id")
	tmdbResponse, err := h.fetchDetailsByID(mediaId, mediaType)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid id provided"})
	}
	c.JSON(http.StatusOK, tmdbResponse)
}

func (h *TMDBHandler) FetchMedia(c *gin.Context) {
	mediaType := c.Param("type") // "movie" or "tv"
	listType := c.Param("list")  // "popular", "top_rated"
	page := c.DefaultQuery("page", "1")
	searchQuery := c.DefaultQuery("search", "")

	tmdbURL := h.buildTMDBURL(mediaType, listType, page, searchQuery)
	if tmdbURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid media type or list"})
		return
	}

	tmdbResponse, err := h.fetchFromTMDB(tmdbURL)
	if err != nil {
		log.Println("TMDB request failed:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch media"})
		return
	}

	c.JSON(http.StatusOK, tmdbResponse)
}

func (h *TMDBHandler) buildTMDBURL(mediaType, listType, page, search string) string {
	if h.tmdbAPIKey == "" {
		log.Println("TMDB_API_KEY is missing")
		return ""
	}

	baseURL := "https://api.themoviedb.org/3"
	if search != "" {
		return fmt.Sprintf("%s/search/%s?query=%s&include_adult=false&language=en-US&page=%s",
			baseURL, mediaType, search, page)
	}
	return fmt.Sprintf("%s/%s/%s?language=en-US&page=%s", baseURL, mediaType, listType, page)
}

func getTmdbPrefix() string {
	baseURL := "https://api.themoviedb.org/3"
	return baseURL
}

func (h *TMDBHandler) SaveMedia(c *gin.Context) {
	var movie models.TMDBMovie
	if err := c.ShouldBindJSON(&movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data"})
		return
	}

	userID, _ := c.Get("user_id")
	_, err := h.db.DB.Exec(`
		INSERT INTO saved (user_id, tmdb_id)
		VALUES ($1, $2)`,
		userID, movie.ID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save media"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Media saved successfully!"})
}
