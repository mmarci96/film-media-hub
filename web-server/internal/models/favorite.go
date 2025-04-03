package models

type MediaFavorite struct {
	ID        int    `json:"id" binding:"required,id"`
	TMDBID    int    `json:"tmdb_id"`
	UserId    int    `json:"user_id"`
	MediaType string `json:"media_type"`
}

type MediaFavoriteRequest struct {
	TMDBID    int    `json:"id"`
	UserId    int    `json:"user_id"`
	MediaType string `json:"media_type"`
}
