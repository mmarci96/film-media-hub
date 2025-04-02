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

type Language struct {
	EnglishName string `json:"english_name"`
	Iso6391     string `json:"iso_639_1"`
	Name        uint32 `json:"name"`
}

type TMDBGengre struct {
	TmdbId int
	Name   string
}

type TMDBCollection struct {
	TmdbCollectioId int    `json:"id"`
	CollectionName  string `json:"name"`
	PosterPath      string `json:"poster_path"`
	BackdropPath    string `json:"backdrop_path"`
}

type TMDBMovieDetails struct {
	TmdbId           int          `json:"tmdb_id"`
	Title            string       `json:"title"`
	Overview         string       `json:"overview"`
	PosterPath       string       `json:"poster_path"`
	BackdropPath     string       `json:"backdrop_path"`
	ReleaseDate      string       `json:"release_date"`
	Budget           int          `json:"budget"`
	HomePage         string       `json:"home_page"`
	OriginalTitle    string       `json:"original_title"`
	OriginalLanguage string       `json:"original_language"`
	Popularity       int          `json:"popularity"`
	Revenue          int64        `json:"revenue"`
	Runtime          int          `json:"runtime"`
	SpokenLanguages  []Language   `json:"spoken_languages"`
	Status           string       `json:"status"`
	Tagline          string       `json:"tagline"`
	VoteAverage      int          `json:"vote_average"`
	VoteCount        int          `json:"vote_count"`
	Genres           []TMDBGengre `json:"genres"`
	Adult            bool         `json:"adult"`
}

type SaveTmdbRequestData struct {
	ID     int `json:"id"`
	UserId int `json:"user_id"`
}

// func CreateTmdbMovieData(userId int) (SavedTmdbMovieData, error) {
//
// }
