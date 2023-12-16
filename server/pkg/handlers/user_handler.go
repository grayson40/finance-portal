package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"

	"backend/pkg/models"
	"backend/pkg/utils"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginResponse struct {
    Token string        `json:"token"`
    User  models.User   `json:"user"`
}

type UserHandler struct {
    DB *gorm.DB
    JWTSecret string
}

func NewUserHandler(db *gorm.DB, JWTSecret string) *UserHandler{
    return &UserHandler{DB: db, JWTSecret: JWTSecret}
}

func (h *UserHandler) RegisterUser(w http.ResponseWriter, r *http.Request) {
    var user models.User

    // Decode the JSON request body into the user struct
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Hash the password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Failed to create user", http.StatusInternalServerError)
        return
    }
    user.Password = string(hashedPassword)

    // Create the user in the database
    result := h.DB.Create(&user)
    if result.Error != nil {
        http.Error(w, result.Error.Error(), http.StatusInternalServerError)
        return
    }

    // Generate JWT token (this function is not shown, you'll need to implement it)
    token, err := utils.GenerateJWT(user, h.JWTSecret)
    if err != nil {
        http.Error(w, "Failed to generate token", http.StatusInternalServerError)
        return
    }

    // Send the token and user as JSON response
    user.Password = ""
    response := LoginResponse{
        Token: token,
        User:  user,
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func (h *UserHandler) LoginUser(w http.ResponseWriter, r *http.Request) {
    var loginDetails struct {
        Email    string
        Password string
    }

    // Decode the JSON request body into the loginDetails struct
    err := json.NewDecoder(r.Body).Decode(&loginDetails)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Retrieve the user from the database
    var user models.User
    result := h.DB.Where("email = ?", loginDetails.Email).First(&user)
    if result.Error != nil {
        http.Error(w, "Invalid login credentials", http.StatusUnauthorized)
        return
    }

    // Compare the hashed password with the password from the request
    err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDetails.Password))
    if err != nil {
        http.Error(w, "Invalid login credentials", http.StatusUnauthorized)
        return
    }

    // Generate JWT token (this function is not shown, you'll need to implement it)
    token, err := utils.GenerateJWT(user, h.JWTSecret)
    if err != nil {
        http.Error(w, "Failed to generate token", http.StatusInternalServerError)
        return
    }

    // Send the token and user as JSON response
    response := LoginResponse{
        Token: token,
        User:  user,
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
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
