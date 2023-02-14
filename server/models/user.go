// package models

// import "time"

// type User struct {
// 	ID         int       `json:"id"`
// 	Fullname   string    `json:"fullname" gorm:"type: varchar(255)"`
// 	Username   string    `json:"username" gorm:"type: varchar(255)"`
// 	Email      string    `json:"email" gorm:"type: varchar(255)"`
// 	Password   string    `json:"password" gorm:"type : varchar(255)"`
// 	ListAsRole string    `json:"listasrole" gorm:"type: varchar(225)"`
// 	Gender     string    `json:"gender" gorm:"type : varchar(255)"`
// 	Phone      string    `json:"phone" gorm:"type : varchar(255)"`
// 	Address    string    `json:"address" gorm:"type : text"`
// 	Image      string    `json:"image" gorm:"type: varchar(255)"`
// 	CreatedAt  time.Time `json:"created_at"`
// 	UpdatedAt  time.Time `json:"update_at"`
// }

// func (User) TableName() string {
// 	return "users"
// }

package models

import "time"

type User struct {
	ID         int       `json:"id"`
	Fullname   string    `json:"fullname" gorm:"type: varchar(255)"`
	Email      string    `json:"email" gorm:"type: varchar(255)"`
	Password   string    `json:"-" gorm:"type: varchar(255)"`
	Username   string    `json:"username" gorm:"type: varchar(255)"`
	ListAsRole string    `json:"listAsRole" gorm:"type: varchar(225)"`
	Address    string    `json:"addres" gorm:"type: varchar(225)"`
	Gender     string    `json:"gender" gorm:"type: varchar(225)"`
	Phone      string    `json:"phone" gorm:"type: varchar(225)"`
	CreatedAt  time.Time `json:"-"`
	UpdatedAt  time.Time `json:"-"`
}

type UsersProfileResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func (UsersProfileResponse) TableName() string {
	return "users"
}
