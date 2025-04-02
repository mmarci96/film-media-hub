package repositories

import (
	"gorm.io/gorm"
	"web-server/internal/models"
)

type ItemRepository interface {
	Create(item *models.Item) error
	GetByID(id uint) (*models.Item, error)
	GetAll() ([]models.Item, error)
	Update(item *models.Item) error
	Delete(id uint) error
}

type itemRepository struct {
	db *gorm.DB
}

func NewItemRepository(db *gorm.DB) ItemRepository {
	return &itemRepository{db: db}
}

// Implement all interface methods with pointer receiver
func (r *itemRepository) Create(item *models.Item) error {
	return r.db.Create(item).Error
}

func (r *itemRepository) GetByID(id uint) (*models.Item, error) {
	var item models.Item
	err := r.db.First(&item, id).Error
	return &item, err
}

func (r *itemRepository) GetAll() ([]models.Item, error) {
	var items []models.Item
	err := r.db.Find(&items).Error
	return items, err
}

func (r *itemRepository) Update(item *models.Item) error {
	return r.db.Save(item).Error
}

func (r *itemRepository) Delete(id uint) error {
	return r.db.Delete(&models.Item{}, id).Error
}
