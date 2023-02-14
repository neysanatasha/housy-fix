package authdto

type SignUpResponse struct {
	ID         int    `json:"id" gorm:"type: int"`
	Fullname   string `json:"fullname" gorm:"type : varchar(255)"`
	Email      string `json:"email" gorm:"type : varchar(255)"`
	Username   string `json:"username" gorm:"type : varchar(255)"`
	ListAsRole string `json:"listAsRole" gorm:"type : varchar(255)"`
	Password   string `json:"password" gorm:"type : varchar(255)"`
	Gender     string `json:"gender" gorm:"type : varchar(255)"`
	Phone      string `json:"phone" gorm:"type : varchar(255)"`
	Address    string `json:"address" gorm:"type : varchar(255)"`
	Message    string `json:"message" gorm:"type : varchar(255)"`
}

type SignInResponse struct {
	ID         int    `json:"id" gorm:"type: int"`
	Fullname   string `json:"fullname" gorm:"type : varchar(255)"`
	Email      string `json:"email" gorm:"type : varchar(255)"`
	Username   string `json:"username" gorm:"type : varchar(255)"`
	ListAsRole string `json:"listAsRole" gorm:"type : varchar(255)"`
	Password   string `json:"password" gorm:"type : varchar(255)"`
	Gender     string `json:"gender" gorm:"type : varchar(255)"`
	Phone      string `json:"phone" gorm:"type : varchar(255)"`
	Address    string `json:"address" gorm:"type : varchar(255)"`
	Token      string `json:"token" gorm:"type : varchar(255)"`
}

type CheckAuthResponse struct {
	ID         int    `gorm:"type: int" json:"id"`
	Fullname   string `gorm:"type: varchar(255)" json:"fullname"`
	Email      string `gorm:"type: varchar(255)" json:"email"`
	Gender     string `json:"gender" gorm:"type : varchar(255)"`
	Phone      string `json:"phone" gorm:"type : varchar(255)"`
	Address    string `json:"address" gorm:"type : varchar(255)"`
	Token      string `json:"token" gorm:"type : varchar(255)"`
	ListAsRole string `gorm:"type: varchar(255)" json:"listAsRole"`

}
