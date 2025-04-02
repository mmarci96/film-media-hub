package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/", handler)
	r.Run(":8080")
}

func handler(c *gin.Context) {
	c.String(200, "Hello, World!")
}
