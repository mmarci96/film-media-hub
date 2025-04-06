package routes

import (
	"server/internal/config"
	"server/internal/database"
	"server/internal/handlers"
	"server/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter(db *database.Database, cfg *config.Config) *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(gin.Logger())
	r.Use(middleware.ErrorHandler())

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set(
			"Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE",
		)
		c.Writer.Header().Set(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization",
		)
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	authHandler := handlers.NewAuthHandler(db, []byte(cfg.JWT.Secret))
	tmdbHandler := handlers.NewTMDBHandler(&cfg.TMDB.ApiKey)
	favoriteHandler := handlers.NewFavoriteHandler(db)
	animeHandler := handlers.NewAnimeHandler()

	public := r.Group("/api/v1")
	{
		public.POST("/register", authHandler.Register)
		public.POST("/login", authHandler.Login)
		public.GET("/anime", animeHandler.GetAnimeList)
		public.GET("/anime/:id", animeHandler.GetAnimeByID)
		public.GET("/tmdb/:type/:list", tmdbHandler.FetchMedia)
		public.GET("/tmdb_id/:type/:id", tmdbHandler.FetchMediaByID)
	}

	protected := r.Group("/api/v1")
	protected.Use(middleware.AuthMiddleware([]byte(cfg.JWT.Secret)))
	{
		protected.POST("/refresh-token", authHandler.RefreshToken)
		protected.POST("/logout", authHandler.Logout)
		protected.GET("/profile", getUserProfile)
		protected.POST("/favorites", favoriteHandler.CreateFavorite)
		protected.GET("/favorites", favoriteHandler.GetFavorites)
		protected.DELETE("/favorites/:id", favoriteHandler.DeleteFavorite)
		protected.PATCH("/favorites/:id", favoriteHandler.UpdateFavoriteWatchStatus)
		protected.GET("/favorites/id_list", favoriteHandler.GetFavoriteIds)
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
