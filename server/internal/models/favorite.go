package models

import "time"

type WatchStatus string

const (
	Watching   WatchStatus = "watching"
	Paused     WatchStatus = "paused"
	Planned    WatchStatus = "planned"
	Completed  WatchStatus = "completed"
	Dropped    WatchStatus = "dropped"
	Rewatching WatchStatus = "rewatching"
	Skipped    WatchStatus = "skipped"
	OnHold     WatchStatus = "on_hold"
)

var validWatchStatuses = map[string]WatchStatus{
	"watching":   Watching,
	"paused":     Paused,
	"planned":    Planned,
	"completed":  Completed,
	"dropped":    Dropped,
	"rewatching": Rewatching,
	"skipped":    Skipped,
	"on_hold":    OnHold,
}

type MediaFavorite struct {
	ID        int         `json:"id" binding:"required,id"`
	TMDBID    int         `json:"tmdb_id" binding:"required,tmdb_id"`
	UserId    int         `json:"user_id" binding:"required,user_id"`
	Status    WatchStatus `json:"status"`
	MediaType string      `json:"media_type" binding:"required,media_type"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
}

func ParseWatchStatus(status string) WatchStatus {
	if ws, exists := validWatchStatuses[status]; exists {
		return ws
	}
	return ""
}

func IsValidWatchStatus(status WatchStatus) bool {
	switch status {
	case Watching, Paused, Planned, Completed, Dropped, Rewatching, Skipped, OnHold:
		return true
	default:
		return false
	}
}
