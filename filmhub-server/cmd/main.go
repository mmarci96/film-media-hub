package main

import (
	"log"
	"net/http"

	"database/sql"
	"fmt"

	"codecool.com/mmarci96/filmhub-server/internal/config"
	"codecool.com/mmarci96/filmhub-server/internal/routes"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal("Failed to load dotenv", err)
	}
	log.Println(cfg)

	db, err := sql.Open("mysql", "root:secret@tcp(127.0.0.1:3306)/mydatabase")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	fmt.Println("Success!")
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(gin.Logger())
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	routes.SetupRouter(db, r, cfg)
	serverAddr := cfg.Server.Host + ":" + cfg.Server.Port

	server := &http.Server{
		Addr:         serverAddr,
		Handler:      r,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
	}

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal("Server failed to start: ", err)
	}
}
