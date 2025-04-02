package models

type TMDBMovie struct {
	ID           int     `json:"id"`
	Title        string  `json:"title"`
	Overview     string  `json:"overview"`
	PosterPath   string  `json:"poster_path"`
	BackdropPath string  `json:"backdrop_path"`
	ReleaseDate  string  `json:"release_date"`
	Popularity   float64 `json:"popularity"`
	VoteAverage  float64 `json:"vote_average"`
	VoteCount    int     `json:"vote_count"`
}

type SaveTmdbRequestData struct {
	ID     int `json:"id"`
	UserId int `json:"user_id"`
}

// func CreateTmdbMovieData(userId int) (SavedTmdbMovieData, error) {
//
// }
