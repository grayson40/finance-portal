package utils

import (
	"backend/pkg/models"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// GenerateJWT generates a JWT token for a given user.
func GenerateJWT(user models.User, secretKey string) (string, error) {
    // Create the JWT claims, which includes the username and expiry time
    claims := &jwt.RegisteredClaims{
        Subject:   string(rune(user.ID)),
        ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)), // Token expires after 24 hours
        IssuedAt:  jwt.NewNumericDate(time.Now()),
    }

    // Create the token with the specified signing method and claims
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    // Sign the token with the secret key and return the token string
    tokenString, err := token.SignedString([]byte(secretKey))
    if err != nil {
        return "", err
    }

    return tokenString, nil
}