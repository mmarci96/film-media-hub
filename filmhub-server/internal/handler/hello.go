package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type HelloHandler struct{}

func NewHelloHandler() *HelloHandler {
	return &HelloHandler{}
}

func (hello *HelloHandler) SayHello(ctx *gin.Context) {
	helloMsg := fmt.Sprintf("Hello world %s", "kaki")
	ctx.JSON(http.StatusOK, gin.H{"message": helloMsg})
}
