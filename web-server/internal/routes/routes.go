package routes

import (
	"web-server/internal/config"
	"web-server/internal/database"
	"web-server/internal/handlers"
	"web-server/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter(db *database.Database, r *gin.Engine, cfg *config.Config) {
	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Initialize handlers with JWT configuration
	authHandler := handlers.NewAuthHandler(db, []byte(cfg.JWT.Secret))
	mediaHandler := handlers.NewMediaHandler(db)
	tmdbHandler := handlers.NewTMDBHandler(cfg.TMDB.ApiKey)

	// Public routes
	public := r.Group("/api/v1")
	{
		public.POST("/register", authHandler.Register)
		public.POST("/login", authHandler.Login)
		public.GET("/tmdb/:type/:list", tmdbHandler.FetchMedia)
	}

	// Protected routes with JWT middleware
	protected := r.Group("/api/v1")
	protected.Use(middleware.AuthMiddleware([]byte(cfg.JWT.Secret)))
	{
		protected.POST("/refresh-token", authHandler.RefreshToken)
		protected.POST("/logout", authHandler.Logout)
		protected.GET("/profile", getUserProfile)
		protected.GET("/media", mediaHandler.GetAllMedia)
		protected.POST("/media", mediaHandler.Create)
	}
}

func getUserProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")
	email, _ := c.Get("email")

	c.JSON(200, gin.H{
		"user_id": userID,
		"email":   email,
	})
}
