package repositories

import (
	"database/sql"
	"time"

	"github.com/folospace/go-mysql-orm/orm"
	"github.com/gin-gonic/gin"
)

type UserRepository struct {
	DB sql.DB
}
type User struct {
	Id        int       `json:"id"`
	Email     string    `json:"email" orm:"email,unique"`
	Name      string    `json:"name" default:"jack"`
	Avatar    string    `json:"avatar" comment:"head image"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (*User) Connections() []*sql.DB {
	return []*sql.DB{db}
}
func (*User) DatabaseName() string {
	return "mydb"
}
func (*User) TableName() string {
	return "user"
}
func (u *User) Query() *orm.Query[*User] {
	return orm.NewQuery(UserTable).WherePrimaryIfNotZero(u.Id)
}
