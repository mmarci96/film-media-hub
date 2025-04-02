package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type HelloHandler struct{}

func NewHelloHandler() *HelloHandler {
	return &HelloHandler{}
}

func (h *HelloHandler) SayHello(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"message": "hello"})
}
