// package routes
//
// import (
// 	"github.com/gin-gonic/gin"
// 	"gorm.io/gorm"
// 	"web-server/internal/handlers"
// 	"web-server/internal/repositories"
// )
//
// func SetupRouter(db *gorm.DB) *gin.Engine {
// 	router := gin.Default()
//
// 	// Initialize repository and handler
// 	itemRepo := repositories.NewItemRepository(db)
// 	itemHandler := handlers.NewItemHandler(itemRepo)
//
// 	api := router.Group("/api/v1")
// 	{
// 		items := api.Group("/items")
// 		{
// 			items.POST("", itemHandler.CreateItem)
// 			items.GET("", itemHandler.GetAllItems)
// 			items.GET("/:id", itemHandler.GetItem)
// 			items.PUT("/:id", itemHandler.UpdateItem)
// 			items.DELETE("/:id", itemHandler.DeleteItem)
// 		}
// 	}
//
// 	return router
// }
