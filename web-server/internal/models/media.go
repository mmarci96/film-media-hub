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

// UserRegister represents registration request data
type MediaRegister struct {
	Title       string `json:"title" binding:"required,title"`
	Description string `json:"description" binding:"required,description"`
}

type MediaFavoriteRequest struct {
	ID int `json:"id" binding:"required,id"`
}
