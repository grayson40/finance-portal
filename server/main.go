// File: cmd/server/main.go

package main

import (
	"backend/pkg/database"
	"backend/pkg/handlers"
	"backend/pkg/routes"
	"log"
	"net/http"
)

func main() {
    // Set up database
    db := database.SetupDatabase()

    // Set up handlers
    userHandler := handlers.NewUserHandler(db)
    expenseHandler := handlers.NewExpenseHandler(db)

    // Set up routes
    routes.SetupRoutes(userHandler, expenseHandler)

    log.Println("Server started on port 5000")
    log.Fatal(http.ListenAndServe(":5000", nil))
}
