package handlers

import (
	"net/http"
	"strconv"
	"web-server/internal/database"
	"web-server/internal/models"

	"github.com/gin-gonic/gin"
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

func (h *FavoriteHandler) UpdateFavoriteWatchStatus(c *gin.Context) {
	var watchStatus models.WatchStatus
	rawStatus := c.Param("status")
	watchStatus = models.ParseWatchStatus(rawStatus)
	if watchStatus == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid watchstatus revieved",
		})
		return
	}

	favoriteId := c.Param("id")
	userId, _ := c.Get("user_id")
	result, err := h.db.DB.Exec(`
		UPDATE favorites
		SET status = $1
		WHERE favorites.user_id = $2
		AND favorites.id = $3`,
		watchStatus, userId, favoriteId,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Server error quering the db.",
		})
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Not found favorite to delete",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Status updated successfully",
		"updated": rowsAffected,
	})
}

func (h *FavoriteHandler) DeleteFavorite(c *gin.Context) {
	favoriteId := c.Param("id")
	userId, _ := c.Get("user_id")

	result, err := h.db.DB.Exec(`
		DELETE FROM favorites
		WHERE id = $1 AND user_id = $2`,
		favoriteId, userId,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Error deleting favorite from database",
			"details": err.Error(),
		})
		return
	}
	ra, _ := result.RowsAffected()
	if ra == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Not found favorite to delete",
		})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{
		"message": "Deleted successfully from favorites",
		"deleted": ra,
	})
}

func (h *FavoriteHandler) GetFavorites(c *gin.Context) {
	userId, _ := c.Get("user_id")
	rows, err := h.db.DB.Query(`
		SELECT id, tmdb_id, user_id, media_type, created_at, updated_at
		FROM favorites
		WHERE user_id = $1`,
		userId,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Server error quering the db.",
		})
		return
	}
	defer rows.Close()
	var favorites []models.MediaFavorite
	for rows.Next() {
		var favorite models.MediaFavorite
		if err := rows.Scan(
			&favorite.ID,
			&favorite.TMDBID,
			&favorite.UserId,
			&favorite.MediaType,
			&favorite.CreatedAt,
			&favorite.UpdatedAt,
		); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Error scanning rows",
			})
			return
		}
		favorites = append(favorites, favorite)
	}
	if err = rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Row iteration error",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"favorites": favorites})

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

	mediaID, err := favorite.getIDAsInt()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "ID must be a number",
			"details": err.Error(),
		})
		return
	}

	userId, _ := c.Get("user_id")
	var exists bool
	err = h.db.DB.QueryRow(`
		SELECT EXISTS(
			SELECT 1 FROM favorites 
			WHERE tmdb_id = $1 
			AND user_id = $2 
			AND media_type = $3
		)`,
		mediaID, userId, favorite.MediaType,
	).Scan(&exists)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Database error",
		})
		return
	}
	if exists {
		c.JSON(http.StatusConflict, gin.H{
			"error": "Media with current id saved already",
		})
		return
	}
	tx, err := h.db.DB.Begin()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save media to favorites",
		})
		return
	}
	var id int
	err = tx.QueryRow(`
		INSERT INTO favorites (user_id, tmdb_id, media_type)
		VALUES ($1 , $2, $3) RETURNING id`,
		userId, favorite.TMDBID, favorite.MediaType,
	).Scan(&id)

	if err = tx.Commit(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Saving favorite failed",
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "Media saved successfully",
		"id":      id,
		"tmdb_id": favorite.TMDBID,
	})
}

func (req *MediaFavoriteRequest) getIDAsInt() (int, error) {
	return strconv.Atoi(req.TMDBID)
}
