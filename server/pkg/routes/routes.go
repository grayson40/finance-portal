package routes

import (
	"backend/pkg/handlers"
	"net/http"
)

func SetupRoutes(userHandler *handlers.UserHandler, expenseHandler *handlers.ExpenseHandler) {
    http.HandleFunc("/api/register", userHandler.RegisterUser) // POST
    http.HandleFunc("/api/login", userHandler.LoginUser) // POST
    http.HandleFunc("/api/users/", userHandler.HandleUserOperations) // GET, PUT, DELETE
    http.HandleFunc("/api/expenses", expenseHandler.CreateExpense) // POST
    http.HandleFunc("/api/expenses/", expenseHandler.HandleExpenseOperations) // GET, PUT, DELETE
}
