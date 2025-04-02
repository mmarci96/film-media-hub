package main

import (
	"log"
	"net/http"

	"codecool.com/mmarci96/filmhub-server/internal/config"
	"codecool.com/mmarci96/filmhub-server/internal/database"
	"codecool.com/mmarci96/filmhub-server/internal/routes"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal("Failed to load dotenv", err, cfg)
	}

	db, err := database.NewDataBase(cfg.GetDSN())
	if err != nil {
		log.Fatal("Failed to connect to database", err)
	}

	defer db.DB.Close()
	// if cfg.Environment == "production" {
	// 	gin.SetMode(gin.ReleaseMode)
	// }
	router := routes.SetupRouter(db, cfg)
	server := &http.Server{
		Addr:         cfg.Server.Host + ":" + cfg.Server.Port,
		Handler:      router,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
	}

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal("Server failed to start: ", err)
	}
}
