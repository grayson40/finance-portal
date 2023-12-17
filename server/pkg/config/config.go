package config

import (
	"os"

	"github.com/joho/godotenv"
)

type AppConfig struct {
    DBConnectionString string
    JWTSecret          string
    ServerPort         string
}

// LoadConfig reads environment variables and populates the AppConfig struct
func LoadConfig() (*AppConfig, error) {
    // Load .env file
    err := godotenv.Load()
    if err != nil {
		return nil, err
    }

    // Load environment variables
    return &AppConfig{
        DBConnectionString: os.Getenv("DB_CONNECTION_STRING"),
        JWTSecret:          os.Getenv("JWT_SECRET"),
        ServerPort:         os.Getenv("APP_PORT"),
    }, nil
}