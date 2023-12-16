package models

import (
	"gorm.io/gorm"
)

type Expense struct {
    gorm.Model
    Name   string
    Amount float64
    UserID uint
    User   User
}
