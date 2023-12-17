package main

import (
	"backend/pkg/config"
	"backend/pkg/database"
	"backend/pkg/handlers"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
    // Load config
    cfg, err := config.LoadConfig()
    if err != nil {
        log.Fatal("Cannot load config: ", err)
    }

    // Set up database
    db := database.SetupDatabase(cfg.DBConnectionString)

    // Set up handlers
    userHandler := handlers.NewUserHandler(db, cfg.JWTSecret)
    expenseHandler := handlers.NewExpenseHandler(db)

    // Initialize Gin
    router := gin.Default()

    // Set up routes
    userHandler.SetupUserRoutes(router)
    expenseHandler.SetupExpenseRoutes(router)

    log.Println("Server started on port " + cfg.ServerPort + "...")
    router.Run(":" + cfg.ServerPort) // Gin takes care of starting the HTTP server
}
