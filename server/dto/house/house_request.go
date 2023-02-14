package housesdto

import "gorm.io/datatypes"

type HouseRequest struct {
	Name        string         `json:"name" gorm:"type: varchar(225)" validate:"required" form:"name"`
	CityName    string         `json:"cityname" gorm:"type: varchar(255)" validate:"required" form:"cityname"`
	Address     string         `json:"address" gorm:"type: text" validate:"required" form:"address"`
	Price       int            `json:"price" gorm:"type: int" validate:"required" form:"price"`
	TypeRent    string         `json:"type_rent" gorm:"type: varchar(225)" validate:"required" form:"Type_rent"`
	Amenities   datatypes.JSON `json:"amenities" gorm:"type: JSON" validate:"required" form:"Amenities"`
	Bedroom     int            `json:"Bedroom" gorm:"type: int" validate:"required" form:"Bedroom"`
	Bathroom    int            `json:"Bathroom" gorm:"type: int" validate:"required" form:"Bathroom"`
	Image       string         `json:"image" gorm:"type: varchar(255)" form:"Image"`
	Description string         `json:"description" gorm:"type: varchar(255)" form:"description"`
	Area        string         `json:"area" gorm:"type: varchar(255)" form:"area"`
}
