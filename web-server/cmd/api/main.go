package main

import (
	"log"
	"web-server/internal/config"
	"web-server/internal/database"
	"web-server/internal/models"
	"web-server/internal/routes"
)

func main() {
	// Load configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Initialize database
	db, err := database.NewMySQLConnection(cfg.DSN())
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Auto migrate models
	if err := db.AutoMigrate(&models.Item{}); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Setup router
	router := routes.SetupRouter(db)

	// Start server
	serverAddr := ":" + cfg.ServerPort
	log.Printf("Starting server on %s in %s mode", serverAddr, cfg.Env)

	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
} // package main
//
// import (
// 	"github.com/gin-gonic/gin"
// )
//
// func main() {
// 	r := gin.Default()
// 	r.GET("/", handler)
// 	r.Run(":8080")
// }
//
// func handler(c *gin.Context) {
// 	c.String(200, "Hello, World!")
// }
