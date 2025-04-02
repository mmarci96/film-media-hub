package routes

import (
	"database/sql"

	"codecool.com/mmarci96/filmhub-server/internal/config"
	"codecool.com/mmarci96/filmhub-server/internal/handler"
	"github.com/gin-gonic/gin"
)

func SetupRouter(db *sql.DB, r *gin.Engine, cfg *config.Config) {
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

	helloHandler := handler.NewHelloHandler()
	pubic := r.Group("/api/v1")
	{
		pubic.GET("/hello", helloHandler.SayHello)
	}

}
