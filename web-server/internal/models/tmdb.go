package models

type TmdbTvData struct {
	ID           int    `json:"id"`
	TmdbId       int    `json:"tmdb_id"`
	Name         string `json:"name"`
	Overview     string `json:"overview"`
	BackdropPath string `json:"backdrop_path"`
	PosterPath   string `json:"poster_path"`
	Popularity   int    `json:"popularity"`
	VoteAverage  int    `json:"vote_average"`
	VoteCount    int    `json:"vote_count"`
}

type TmdbMovieData struct {
	ID           int    `json:"id"`
	TmdbId       int    `json:"tmdb_id"`
	Title        string `json:"title"`
	Overview     string `json:"overview"`
	BackdropPath string `json:"backdrop_path"`
	PosterPath   string `json:"poster_path"`
	Popularity   int    `json:"popularity"`
	VoteAverage  int    `json:"vote_average"`
	VoteCount    int    `json:"vote_count"`
}

type SavedTmdbMovieData struct {
	TmdbMovie TmdbMovieData `json:"tmdb_movie"`
	UserId    int           `json:"id"`
}

type SaveTmdbRequestData struct {
	TmdbId int `json:"id"`
	Title  string
}
