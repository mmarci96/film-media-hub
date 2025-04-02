package handlers

import (
	"net/http"
	"web-server/internal/database"
	"web-server/internal/models"

	"github.com/gin-gonic/gin"
)

type MediaHandler struct {
	db *database.Database
}

func NewMediaHandler(db *database.Database) *MediaHandler {
	return &MediaHandler{db: db}
}

func (h *MediaHandler) GetAllMedia(c *gin.Context) {
	var medias []models.Media

	// Query all media records
	rows, err := h.db.DB.Query("SELECT id, title, description, updated_at, created_at FROM media")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch media"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var media models.Media
		if err := rows.Scan(&media.ID, &media.Title, &media.Description, &media.UpdatedAt, &media.CreatedAt); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan media"})
			return
		}
		medias = append(medias, media)
	}

	c.JSON(http.StatusOK, gin.H{"media": medias})
}

func (h *MediaHandler) Create(c *gin.Context) {
	var media models.MediaRegister
	if err := c.ShouldBindJSON(&media); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Invalid input format",
			"details": err.Error(),
		})
		return
	}

	var exists bool
	err := h.db.DB.QueryRow("SELECT EXISTS(SELECT 1 FROM medias WHERE title = $1)",
		media.Title).Scan(&exists)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	if exists {
		c.JSON(http.StatusConflict, gin.H{"error": "Title already created"})
		return
	}

	tx, err := h.db.DB.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction start failed"})
		return
	}

	var id int
	err = tx.QueryRow(`
        INSERT INTO media (title, description) 
        VALUES ($1, $2) 
        RETURNING id`,
		media.Title, media.Description,
	).Scan(&id)

	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Media creation failed"})
		return
	}

	if err = tx.Commit(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Transaction commit failed"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":  "Media created successfully",
		"media_id": id,
	})
}
