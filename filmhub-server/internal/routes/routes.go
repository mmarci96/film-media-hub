package routes

import (
	"codecool.com/mmarci96/filmhub-server/internal/config"
	"codecool.com/mmarci96/filmhub-server/internal/database"
	"codecool.com/mmarci96/filmhub-server/internal/handler"
	"github.com/gin-gonic/gin"
)

func SetupRouter(db *database.Database, cfg *config.Config, router *gin.Engine) {
	router.Use(gin.Recovery())
	router.Use(gin.Logger())

	router.Use(func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(204)
			return
		}
		ctx.Next()
		helloHandler := handler.NewHelloHandler()
		pubic := router.Group("/api/v1")
		{
			pubic.GET("/hello", helloHandler.SayHello)
		}
	})

}
