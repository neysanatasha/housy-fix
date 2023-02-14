package routes

import (
	"housy/handlers"
	"housy/pkg/mysql"
	"housy/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions", h.FindTransaction).Methods("GET")
	r.HandleFunc("/transaction/{id}", h.GetTransaction).Methods("GET")
	r.HandleFunc("/transaction", h.CreateTransaction).Methods("POST")
	// r.HandleFunc("/transaction/{id}", middleware.Auth(middleware.UploadFile(h.UpdateTransaction, "attachment"))).Methods("PATCH")
	r.HandleFunc("/transaction/{id}", h.DeleteTransaction).Methods("DELETE")

	r.HandleFunc("/notification", h.Notification).Methods("POST")

	// r.HandleFunc("/house/{id}", middleware.Auth(middleware.UploadFile(h.UpdateHouse, "image"))).Methods("PATCH")
}
