package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type TMDBHandler struct {
	tmdbAPIKey string
}

func NewTMDBHandler(tmdbAPIKey string) *TMDBHandler {
	return &TMDBHandler{tmdbAPIKey: tmdbAPIKey}
}

func (h *TMDBHandler) FetchMedia(c *gin.Context) {
	typeParam := c.Param("type") // Example: "movie" or "tv"
	listParam := c.Param("list") // Example: "popular", "top_rated"
	page := c.DefaultQuery("page", "1")

	tmdbAPIKey := h.tmdbAPIKey
	if tmdbAPIKey == "" {
		log.Println("TMDB_API_KEY is missing in environment variables")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server configuration error"})
		return
	}

	tmdbURL := fmt.Sprintf("https://api.themoviedb.org/3/%s/%s?language=en-US&page=%s",
		typeParam, listParam, page)

	req, err := http.NewRequest("GET", tmdbURL, nil)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	// Add Authorization header
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", "Bearer "+tmdbAPIKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch data"})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		c.JSON(resp.StatusCode, gin.H{"error": "TMDB API error"})
		return
	}

	var result map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse response"})
		return
	}

	c.JSON(http.StatusOK, result)
}

