package handlers

import (
	"backend/pkg/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ExpenseHandler struct {
    DB *gorm.DB
}

func NewExpenseHandler(db *gorm.DB) *ExpenseHandler {
    return &ExpenseHandler{DB: db}
}

func (h *ExpenseHandler) SetupExpenseRoutes(router *gin.Engine) {
    router.POST("/api/expenses", h.CreateExpense)
    router.GET("/api/users/:id/expenses", h.GetExpensesForUser)
    router.GET("/api/expenses/:id", h.GetExpense)
    router.PUT("/api/expenses/:id", h.UpdateExpense)
    router.DELETE("/api/expenses/:id", h.DeleteExpense)
}

func (h *ExpenseHandler) CreateExpense(c *gin.Context) {
    var expense models.Expense
    if err := c.ShouldBindJSON(&expense); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if result := h.DB.Create(&expense); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusCreated, expense)
}

func (h *ExpenseHandler) GetExpensesForUser(c *gin.Context) {
    userID, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    var expenses []models.Expense
    if result := h.DB.Where("user_id = ?", userID).Order("created_at DESC").Find(&expenses); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, expenses)
}

func (h *ExpenseHandler) GetExpense(c *gin.Context) {
    // Implementation for getting an expense by ID
}

func (h *ExpenseHandler) UpdateExpense(c *gin.Context) {
    // Implementation for updating an expense by ID
}

func (h *ExpenseHandler) DeleteExpense(c *gin.Context) {
    // Extract the expense ID from the URL
    expenseIDStr := c.Param("id")

    // Convert the expense ID to uint
    expenseID, err := strconv.ParseUint(expenseIDStr, 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid expense ID"})
        return
    }

    // Create an Expense instance with the ID set to expenseID
    expense := models.Expense{ID: uint(expenseID)}

    // Delete the expense from the database
    if err := h.DB.Delete(&expense).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete expense"})
        return
    }

    // Respond with success
    c.JSON(http.StatusOK, gin.H{"message": "Expense deleted successfully"})
}

// Implement the GetExpense, UpdateExpense, and DeleteExpense methods similarly
