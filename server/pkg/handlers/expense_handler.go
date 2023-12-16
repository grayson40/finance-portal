package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"backend/pkg/models"

	"gorm.io/gorm"
)

type ExpenseHandler struct {
    DB *gorm.DB
}

func NewExpenseHandler(db *gorm.DB) *ExpenseHandler{
    return &ExpenseHandler{DB: db}
}

func (h *ExpenseHandler) CreateExpense(w http.ResponseWriter, r *http.Request) {
    var expense models.Expense

    // Decode the JSON request body into the expense struct
    err := json.NewDecoder(r.Body).Decode(&expense)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Create the expense in the database
    result := h.DB.Create(&expense)
    if result.Error != nil {
        http.Error(w, result.Error.Error(), http.StatusInternalServerError)
        return
    }

    // Send a success response
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(expense)
}

func (h *ExpenseHandler) GetExpense(w http.ResponseWriter, r *http.Request, id string) {
    // Implementation for getting an expense by ID
}

func (h *ExpenseHandler) UpdateExpense(w http.ResponseWriter, r *http.Request, id string) {
    // Implementation for updating a expense by ID
}

func (h *ExpenseHandler) DeleteExpense(w http.ResponseWriter, r *http.Request, id string) {
    // Implementation for deleting a expense by ID
}

func (h *ExpenseHandler) HandleExpenseOperations(w http.ResponseWriter, r *http.Request) {
    // Extracting the ID from the URL
    id := strings.TrimPrefix(r.URL.Path, "/api/expenses/")
    if id == "" {
        http.Error(w, "Expense ID is required", http.StatusBadRequest)
        return
    }

    // Determine the HTTP method and call the appropriate handler
    switch r.Method {
    case "GET":
        h.GetExpense(w, r, id)
    case "PUT":
        h.UpdateExpense(w, r, id)
    case "DELETE":
        h.DeleteExpense(w, r, id)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}
