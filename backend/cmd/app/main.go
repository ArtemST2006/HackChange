package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/ArtemST2006/HackChange/internal/config"
	"github.com/ArtemST2006/HackChange/internal/handlers"
	"github.com/ArtemST2006/HackChange/internal/repository"
	"github.com/ArtemST2006/HackChange/internal/server"
	service "github.com/ArtemST2006/HackChange/internal/services"
)

func main() {
	env, err := config.GetEnv("ENVIRONMENT")
	if err != nil {
		fmt.Errorf("environment variable ENVIRONMENT not set: %w", err)
		return
	}

	log := InitLogger(env)

	db, err := repository.InitBD() // инициализация бд
	if err != nil {
		log.Error("failed to init db", slog.String("error", err.Error()))
		panic(err)
	}

	repository := repository.NewRepository(db) //инициализация репозитория
	service := service.NewService(repository)  //инициализация сервисов
	handler := handlers.NewHandler(service)    //инициализация хендлеров

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)

	srv := new(server.Server)
	go func() {
		if err := srv.Start("8000", handler.InitRoutes()); err != nil {
			log.Error("failed to run server", slog.String("error", err.Error()))
		}
	}()

	<-stop

	if err := srv.Shutdown(context.Background()); err != nil {
		log.Error("failed to shutdown server", slog.String("error", err.Error()))
	}
	log.Info("server stopped")
	closer, err := db.DB()
	if err != nil {
		log.Error("error getting db connection", slog.String("error", err.Error()))
	}
	if err := closer.Close(); err != nil {
		log.Error("error closing db connection", slog.String("error", err.Error()))
	}
}

func InitLogger(env string) *slog.Logger {
	var log *slog.Logger

	switch env {
	case "PRODUCTION":
		log = slog.New(
			slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}),
		)
	case "DEVELOPMENT":
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelError}),
		)
	default:
		log = slog.New(
			slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}),
		)
	}

	return log
}
