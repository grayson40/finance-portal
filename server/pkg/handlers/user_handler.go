package handlers

import (
	"backend/pkg/models"
	"backend/pkg/utils"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserHandler struct {
    DB        *gorm.DB
    JWTSecret string
}

func NewUserHandler(db *gorm.DB, JWTSecret string) *UserHandler {
    return &UserHandler{DB: db, JWTSecret: JWTSecret}
}

func (h *UserHandler) SetupUserRoutes(router *gin.Engine) {
    router.POST("/api/register", h.RegisterUser)
    router.POST("/api/login", h.LoginUser)
    router.GET("/api/users/:id", h.GetUser)
    router.PUT("/api/users/:id", h.UpdateUser)
    router.DELETE("/api/users/:id", h.DeleteUser)
}

func (h *UserHandler) RegisterUser(c *gin.Context) {
    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
        return
    }
    user.Password = string(hashedPassword)

    if result := h.DB.Create(&user); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    token, err := utils.GenerateJWT(user, h.JWTSecret)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    user.Password = ""
    c.JSON(http.StatusCreated, gin.H{"token": token, "user": user})
}

func (h *UserHandler) LoginUser(c *gin.Context) {
    var loginDetails struct {
        Email    string
        Password string
    }
    if err := c.ShouldBindJSON(&loginDetails); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var user models.User
    if result := h.DB.Where("email = ?", loginDetails.Email).First(&user); result.Error != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
        return
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginDetails.Password)); err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid login credentials"})
        return
    }

    token, err := utils.GenerateJWT(user, h.JWTSecret)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": token, "user": user})
}

func (h *UserHandler) GetUser(c *gin.Context) {
    userID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    var user models.User
    if result := h.DB.First(&user, userID); result.Error != nil {
        if errors.Is(result.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        }
        return
    }

    c.JSON(http.StatusOK, user)
}

func (h *UserHandler) UpdateUser(c *gin.Context) {
    userID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    var user models.User
    if result := h.DB.First(&user, userID); result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }

    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if result := h.DB.Save(&user); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, user)
}

func (h *UserHandler) DeleteUser(c *gin.Context) {
    userID, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    if result := h.DB.Delete(&models.User{}, userID); result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    // if result.RowsAffected == 0 {
    //     c.JSON(http.StatusNotFound, gin.H{"error": "No user found with given ID"})
    //     return
    // }

    c.Status(http.StatusNoContent)
}
