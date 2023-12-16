package models

import (
	"gorm.io/gorm"
)

type Expense struct {
    gorm.Model
    ID    uint
    Name   string
    Amount float64
    UserID uint
}
