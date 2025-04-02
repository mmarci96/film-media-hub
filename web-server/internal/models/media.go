package models

import (
	"time"
)

// User represents our database user
type Media struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// UserLogin represents login request data
type MediaRequestData struct {
	Title       string `json:"title" binding:"required,title"`
	Description string `json:"description" binding:"required,description"`
}

// UserRegister represents registration request data
type MediaResponseData struct {
	ID       int    `json:"id" binding:"required:id"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}
