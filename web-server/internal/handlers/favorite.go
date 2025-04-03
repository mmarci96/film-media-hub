package handlers

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
	"web-server/internal/database"
)

type FavoriteHandler struct {
	db *database.Database
}

type MediaFavoriteRequest struct {
	TMDBID    string `json:"id"`
	MediaType string `json:"media_type"`
}

func NewFavoriteHandler(db *database.Database) *FavoriteHandler {
	return &FavoriteHandler{db: db}
}
func (req *MediaFavoriteRequest) GetIDAsInt() (int, error) {
	return strconv.Atoi(req.TMDBID) // Convert string to int
}
func (h *FavoriteHandler) CreateFavorite(c *gin.Context) {
	var favorite MediaFavoriteRequest
	if err := c.ShouldBindJSON(&favorite); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid input form",
			"details": err.Error(),
		})
		return
	}

	mediaID, err := favorite.GetIDAsInt()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID must be a number", "details": err.Error()})
		return
	}

	userId, _ := c.Get("user_id")
	log.Println(userId, mediaID)
	var exists bool
	err = h.db.DB.QueryRow(
		"SELECT EXISTS(SELECT 1 FROM favorites WHERE tmdb_id = $1 AND user_id = $2 AND media_type = $3)",
		mediaID, userId, favorite.MediaType,
	).Scan(&exists)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Database error",
		})
		return
	}
	if exists {
		c.JSON(http.StatusConflict, gin.H{"error": "Media with current id saved already"})
	}
	tx, err := h.db.DB.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save media to favorites"})
		return
	}
	var id int
	err = tx.QueryRow(
		`INSERT INTO favorites (user_id, tmdb_id, media_type)
		VALUES ($1 , $2, $3) RETURNING id`,
		userId, favorite.TMDBID, favorite.MediaType,
	).Scan(&id)

	if err = tx.Commit(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Saving favorite failed"})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "Media saved successfully",
		"id":      id,
		"tmdb_id": favorite.TMDBID,
	})
}

func (h *FavoriteHandler) DeleteFavorite(c *gin.Context) {

}
