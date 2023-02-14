package authdto

type SignUpRequest struct {
	ID         int    `json:"id"`
	Fullname   string `json:"fullname" gorm:"type : varchar(255)" validate:"required"`
	Username   string `json:"username" gorm:"type : varchar(255)" validate:"required"`
	Email      string `json:"email" gorm:"type : varchar(255)" validate:"required"`
	Password   string `json:"password" gorm:"type : varchar(255)" validate:"required"`
	ListAsRole string `json:"listAsRole" gorm:"type : varchar(255)"`
	Gender     string `json:"gender" gorm:"type : varchar(255)"`
	Phone      string `json:"phone" gorm:"type : varchar(255)" validate:"required"`
	Address    string `json:"address" gorm:"type : text" validate:"required"`
	// Image      string `json:"image" gorm:"type : varchar(255)"`
}

type SignInRequest struct {
	Username   string `json:"username" gorm:"type : varchar(255)" validate:"required"`
	Password   string `json:"password" gorm:"type : varchar(255)" validate:"required"`
	ListAsRole string `json:"listAsRole" gorm:"type : varchar(255)" validate:"required"`
}

// change_password
type ChangePasswordRequest struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}
