package housesdto

import "gorm.io/datatypes"

type ResponseHouse struct {
	ID          int            `json:"id" gorm:"type: varchar(225)" form:"id"`
	Name        string         `json:"name" gorm:"type: varchar(225)"  form:"Name"`
	CityName    string         `json:"cityname" gorm:"type: varchar(255)"  form:"CityName"`
	Address     string         `json:"address" gorm:"type: text"  form:"Address"`
	Price       int            `json:"price" gorm:"type: int"  form:"Price"`
	TypeRent    string         `json:"type_rent" gorm:"type: varchar(225)"  form:"TypeRent"`
	Amenities   datatypes.JSON `json:"amenities" gorm:"type: JSON"  form:"Amenities"`
	Bedroom     int            `json:"Bedroom" gorm:"type: int"  form:"Bedroom"`
	Bathroom    int            `json:"Bathroom" gorm:"type: int"  form:"Bathroom"`
	Image       string         `json:"image" gorm:"type: varchar(255)" form:"Image"`
	Description string         `json:"description" gorm:"type: varchar(255)" form:"description"`
	Area        string         `json:"area" gorm:"type: varchar(255)" form:"area"`
}
