package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AnimeHandler struct{}

type AnimeItem struct {
	MalID    int    `json:"mal_id"`
	Title    string `json:"title"`
	English  string `json:"title_english"`
	Synopsis string `json:"synopsis"`
	Images   struct {
		JPG struct {
			ImageURL      string `json:"image_url"`
			LargeImageURL string `json:"large_image_url"`
		} `json:"jpg"`
	} `json:"images"`
	Trailer struct {
		URL    string `json:"url"`
		Images struct {
			MaximumImageUrl string `json:"maximum_image_url"`
		} `json:"images"`
	} `json:"trailer"`
}

type AnimeResponse struct {
	Data []AnimeItem `json:"data"`
}

type AnimeDetailResponse struct {
	Data any `json:"data"`
}

type MediaItem struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Name         string `json:"name"`
	Overview     string `json:"overview"`
	PosterPath   string `json:"poster_path"`
	BackdropPath string `json:"backdrop_path"`
	MediaType    string `json:"mediaType"`
}

func NewAnimeHandler() *AnimeHandler {
	return &AnimeHandler{}
}

func (h *AnimeHandler) GetAnimeList(c *gin.Context) {
	listType := c.DefaultQuery("type", "popular")
	page := c.DefaultQuery("page", "1")

	var apiUrl string
	switch listType {
	case "popular":
		apiUrl = fmt.Sprintf("https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=%s", page)
	case "on_the_air":
		apiUrl = fmt.Sprintf("https://api.jikan.moe/v4/top/anime?filter=airing&page=%s", page)
	case "now_playing":
		apiUrl = fmt.Sprintf("https://api.jikan.moe/v4/top/anime?filter=favorite&page=%s", page)
	case "upcoming":
		apiUrl = fmt.Sprintf("https://api.jikan.moe/v4/top/anime?filter=upcoming&page=%s", page)
	default:
		apiUrl = fmt.Sprintf("https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=%s", page)
	}

	resp, err := http.Get(apiUrl)
	if err != nil {
		log.Println("Error fetching anime list:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch anime list"})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("Jikan API error: %s", string(body))
		c.JSON(resp.StatusCode, gin.H{"error": "Jikan API returned non-200 status"})
		return
	}

	var animeResp AnimeResponse
	if err := json.NewDecoder(resp.Body).Decode(&animeResp); err != nil {
		log.Println("Failed to decode Jikan response:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode anime response"})
		return
	}

	mediaItems := []MediaItem{}
	for _, anime := range animeResp.Data {
		item := MediaItem{
			ID:           anime.MalID,
			Title:        anime.Title,
			Name:         anime.English,
			Overview:     anime.Synopsis,
			PosterPath:   anime.Images.JPG.ImageURL,
			BackdropPath: anime.Trailer.Images.MaximumImageUrl,
			MediaType:    "anime",
		}
		mediaItems = append(mediaItems, item)
	}

	c.JSON(http.StatusOK, mediaItems)
}

func (h *AnimeHandler) GetAnimeByID(c *gin.Context) {
	animeID := c.Param("id")
	apiUrl := fmt.Sprintf("https://api.jikan.moe/v4/anime/%s", animeID)

	resp, err := http.Get(apiUrl)
	if err != nil {
		log.Println("Error fetching anime details:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch anime details"})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error reading the response body:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read the response body"})
		return
	}

	if resp.StatusCode != http.StatusOK {
		log.Printf("Jikan API error: %s", string(body))
		c.JSON(resp.StatusCode, gin.H{"error": "Jikan API returned non-200 status"})
		return
	}

	var animeDetailResponse AnimeDetailResponse
	if err := json.Unmarshal(body, &animeDetailResponse); err != nil {
		log.Println("Failed to decode Jikan response:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode anime details"})
		return
	}
	c.JSON(http.StatusOK, animeDetailResponse)
}
