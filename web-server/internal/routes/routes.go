package routes

import (
	"web-server/internal/config"
	"web-server/internal/database"
	"web-server/internal/handlers"
	"web-server/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter(db *database.Database, cfg *config.Config) *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(gin.Logger())
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

	authHandler := handlers.NewAuthHandler(db, []byte(cfg.JWT.Secret))
	mediaHandler := handlers.NewMediaHandler(db)
	tmdbHandler := handlers.NewTMDBHandler(db, cfg.TMDB.ApiKey)

	public := r.Group("/api/v1")
	{
		public.POST("/register", authHandler.Register)
		public.POST("/login", authHandler.Login)
		public.GET("/tmdb/:type/:list", tmdbHandler.FetchMedia)
	}

	protected := r.Group("/api/v1")
	protected.Use(middleware.AuthMiddleware([]byte(cfg.JWT.Secret)))
	{
		protected.POST("/refresh-token", authHandler.RefreshToken)
		protected.POST("/logout", authHandler.Logout)
		protected.GET("/profile", getUserProfile)
		protected.POST("/saved", tmdbHandler.SaveMedia)
		protected.GET("/media", mediaHandler.GetAllMedia)
		protected.POST("/media", mediaHandler.Create)
	}
	return r
}

func getUserProfile(c *gin.Context) {
	userID, _ := c.Get("user_id")
	email, _ := c.Get("email")

	c.JSON(200, gin.H{
		"user_id": userID,
		"email":   email,
	})
}
