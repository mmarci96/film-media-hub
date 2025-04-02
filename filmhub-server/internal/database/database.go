package database

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"time"
)

type Database struct {
	DB *sql.DB
}

func NewDataBase(connectionString string) (*Database, error) {
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)
	if err := db.Ping(); err != nil {
		return nil, err
	}
	return &Database{DB: db}, nil
}
