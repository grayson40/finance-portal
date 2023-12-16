package database

import (
	"backend/pkg/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func SetupDatabase() *gorm.DB {
    db, err := gorm.Open(sqlite.Open("finance-portal.db"), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // Auto migrate your models
    db.AutoMigrate(&models.User{})
    db.AutoMigrate(&models.Expense{})

    return db
}
