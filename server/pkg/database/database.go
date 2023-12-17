package database

import (
	"backend/pkg/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func SetupDatabase(DBConnectionString string) *gorm.DB {
    db, err := gorm.Open(sqlite.Open(DBConnectionString), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // Auto migrate models
    db.AutoMigrate(&models.User{}, &models.Expense{})

    return db
}
