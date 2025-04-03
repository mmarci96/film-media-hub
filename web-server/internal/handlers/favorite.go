package handlers

import (
	"net/http"
	"web-server/internal/database"
	"web-server/internal/models"

	"github.com/gin-gonic/gin"
)

type FavoriteHandler struct {
	db *database.Database
}

func NewFavoriteHandler(db *database.Database) *FavoriteHandler {
	return &FavoriteHandler{db: db}
}

func (h *FavoriteHandler) CreateFavorite(c *gin.Context) {
	var favorite models.MediaFavoriteRequest
	if err := c.ShouldBindJSON(&favorite); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid input form",
			"details": err.Error(),
		})
		return
	}
	var exists bool
	err := h.db.DB.QueryRow(
		"SELECT EXISTS(SELECT 1 FROM favorites WHERE tmdb_id = $1 && user_id = $2 && media_type = $3)",
		favorite.TMDBID, favorite.UserId, favorite.MediaType,
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
		favorite.UserId, favorite.TMDBID, favorite.MediaType,
	).Scan(&id)

	if err = tx.Commit(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Saving favorite failed"})
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "Media saved successfully",
		"id":      id,
		"tmdb_id": favorite.TMDBID,
	})
}

func (h *FavoriteHandler) DeleteFavorite(c *gin.Context) {

}
