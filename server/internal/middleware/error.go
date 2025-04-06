package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Log the error
				fmt.Println("Recovered from panic:", err)

				// Return an error response to the client
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": "Recovered Internal Server Error",
				})
			}
		}()

		c.Next()
	}
}
