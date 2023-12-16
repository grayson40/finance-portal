// File: cmd/server/main.go

package main

import (
	"backend/pkg/config"
	"backend/pkg/database"
	"backend/pkg/handlers"
	"backend/pkg/routes"
	"log"
	"net/http"
)

func main() {
    // Load config
    config, err := config.LoadConfig()
    if err != nil {
        log.Fatal("Cannot load config: ", err)
    }

    // Set up database
    db := database.SetupDatabase(config.DBConnectionString)

    // Set up handlers
    userHandler := handlers.NewUserHandler(db, config.JWTSecret)
    expenseHandler := handlers.NewExpenseHandler(db)

    // Set up routes
    routes.SetupRoutes(userHandler, expenseHandler)

    log.Println("Server started on port " + config.ServerPort + "...")
    log.Fatal(http.ListenAndServe(config.ServerPort, nil))
}
