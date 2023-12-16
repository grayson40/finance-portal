package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"

	"backend/pkg/models"

	"gorm.io/gorm"
)

type UserHandler struct {
    DB *gorm.DB
}

func NewUserHandler(db *gorm.DB) *UserHandler{
    return &UserHandler{DB: db}
}

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
    var user models.User

    // Decode the JSON request body into the user struct
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Create the user in the database
    result := h.DB.Create(&user)
    if result.Error != nil {
        http.Error(w, result.Error.Error(), http.StatusInternalServerError)
        return
    }

    // Send a success response
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request, id string) {
    // Convert the id to uint
    userID, err := strconv.Atoi(id)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    // Get the user from the database
    var user models.User
    result := h.DB.First(&user, userID)
    if result.Error != nil {
        if errors.Is(result.Error, gorm.ErrRecordNotFound) {
            http.Error(w, "User not found", http.StatusNotFound)
        } else {
            http.Error(w, result.Error.Error(), http.StatusInternalServerError)
        }
        return
    }

    // Send the user as JSON response
    json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) UpdateUser(w http.ResponseWriter, r *http.Request, id string) {
    // Convert the id to uint
    userID, err := strconv.Atoi(id)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    // Get the user from the database
    var user models.User
    result := h.DB.First(&user, userID)
    if result.Error != nil {
        if errors.Is(result.Error, gorm.ErrRecordNotFound) {
            http.Error(w, "User not found", http.StatusNotFound)
        } else {
            http.Error(w, result.Error.Error(), http.StatusInternalServerError)
        }
        return
    }

    // Decode the JSON request body into the user struct
    err = json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Update the user in the database
    result = h.DB.Save(&user)
    if result.Error != nil {
        http.Error(w, result.Error.Error(), http.StatusInternalServerError)
        return
    }

    // Send a success response
    json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) DeleteUser(w http.ResponseWriter, r *http.Request, id string) {
    // Convert the id to uint
    userID, err := strconv.Atoi(id)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    // Delete the user from the database
    var user models.User
    result := h.DB.Delete(&user, userID)
    if result.Error != nil {
        http.Error(w, result.Error.Error(), http.StatusInternalServerError)
        return
    }

    // Check if any user was deleted
    if result.RowsAffected == 0 {
        http.Error(w, "No user found with given ID", http.StatusNotFound)
        return
    }

    // Send a success response
    w.WriteHeader(http.StatusNoContent)
}

func (h *UserHandler) HandleUserOperations(w http.ResponseWriter, r *http.Request) {
    // Extracting the ID from the URL
    id := strings.TrimPrefix(r.URL.Path, "/api/users/")
    if id == "" {
        http.Error(w, "User ID is required", http.StatusBadRequest)
        return
    }

    // Determine the HTTP method and call the appropriate handler
    switch r.Method {
    case "GET":
        h.GetUser(w, r, id)
    case "PUT":
        h.UpdateUser(w, r, id)
    case "DELETE":
        h.DeleteUser(w, r, id)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}
