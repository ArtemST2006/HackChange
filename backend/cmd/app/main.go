package main

import (
	"log/slog"
	"os"
)

func main() {
	//init log

	//init db

	//init db layer

	//init service layer

	//init hadler layer

	//start server

	//graceful shutdown

}

func InitLogger() *slog.Logger {
	var log *slog.Logger

	log = slog.New(
		slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}),
	)

	return log

}
