package models

type TmdbMovieData struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Overview     string `json:"overview"`
	BackdropPath string `json:"backdrop_path"`
	PosterPath   string `json:"poster_path"`
	Popularity   int    `json:"popularity"`
	VoteAverage  int    `json:"vote_average"`
	VoteCount    int    `json:"vote_count"`
}
