package handlers

import (
	"encoding/json"
	"fmt"
	dto "housy/dto/result"
	"housy/models"
	"log"
	"os"
	"strconv"
	"time"

	transactiondto "housy/dto/transaction"
	"housy/repositories"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

// var path1_file = "http://localhost:5000/uploads/"

var c = coreapi.Client{
	ServerKey: os.Getenv("SERVER_KEY"),
	ClientKey: os.Getenv("CLIENT_KEY"),
}

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) FindTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	transactions, err := h.TransactionRepository.FindTransaction()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	// for i, p := range transactions {
	// 	transactions[i].Attachment = path1_file + p.Attachment
	// }

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: transactions}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) GetTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	// var profile models.Profile
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	// transaction.Attachment = path1_file + transaction.Attachment

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(transaction)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := new(transactiondto.RequestTransaction)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var TransIdIsMatch = false
	var TransactionId int
	for !TransIdIsMatch {
		TransactionId = int(time.Now().Unix()) // 12948129048123
		transactionData, _ := h.TransactionRepository.GetTransaction(TransactionId)
		if transactionData.ID == 0 {
			TransIdIsMatch = true
		}
	}

	transaction := models.Transaction{
		ID:            TransactionId,
		CheckIn:       request.CheckIn,
		CheckOut:      request.CheckOut,
		HouseId:       request.HouseId,
		UserId:        request.UserId,
		Total:         request.Total,
		StatusPayment: request.StatusPayment,
	}

	newTransaction, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	transaction, _ = h.TransactionRepository.GetTransaction(newTransaction.ID) //112233
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	s := snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(transaction.ID), //112233
			GrossAmt: int64(transaction.Total),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: transaction.User.Fullname,
			Email: transaction.User.Email,
		},
	}

	snapResp, _ := s.CreateTransaction(req)
	fmt.Println("ini snaprespon", snapResp)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: snapResp}
	json.NewEncoder(w).Encode(response)
	// err := mysql.DB.Create(&product).Error
	// transaction, err = h.TransactionRepository.CreateTransaction(transaction)
	// if err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	// transaction, _ = h.TransactionRepository.GetTransaction(transaction.ID)

	// w.WriteHeader(http.StatusOK)
	// response := dto.SuccessResult{Code: http.StatusOK, Data: transaction}
	// json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) Notification(w http.ResponseWriter, r *http.Request) {
	var notificationPayload map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string) // 112233

	transaction, err := h.TransactionRepository.GetOneTransaction(orderId)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("pending", orderId)
		} else if fraudStatus == "accept" {
			SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", orderId)
		}
	} else if transactionStatus == "settlement" {
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", orderId)
	} else if transactionStatus == "deny" {
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("failed", orderId)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("failed", orderId)
	} else if transactionStatus == "pending" {
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("pending", orderId)
	}

}

// func (h *handlerTransaction) UpdateTransaction(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	house_id, _ := strconv.Atoi(r.FormValue("house_id"))
// 	user_id, _ := strconv.Atoi(r.FormValue("user_id"))
// 	total, _ := strconv.Atoi(r.FormValue("total"))

// 	request := transactiondto.RequestTransaction{
// 		CheckIn:       r.FormValue("check_in"),
// 		CheckOut:      r.FormValue("check_out"),
// 		StatusPayment: r.FormValue("status_payment"),
// 		Attachment:    r.FormValue("attachment"),
// 		HouseId:       house_id,
// 		UserId:        user_id,
// 		Total:         total,
// 	}

// 	id, _ := strconv.Atoi(mux.Vars(r)["id"])
// 	transaction, err := h.TransactionRepository.GetTransaction(int(id))
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	if request.CheckIn != "" {
// 		transaction.CheckIn = request.CheckIn
// 	}

// 	if request.CheckOut != "" {
// 		transaction.CheckOut = request.CheckOut
// 	}

// 	if request.HouseId != 0 {
// 		transaction.HouseId = request.HouseId
// 	}

// 	if request.UserId != 0 {
// 		transaction.UserId = request.UserId
// 	}

// 	if request.Total != 0 {
// 		transaction.Total = request.Total
// 	}

// 	if request.Attachment != "" {
// 		transaction.Attachment = request.Attachment
// 	}

// 	if request.StatusPayment != "" {
// 		transaction.StatusPayment = request.StatusPayment
// 	}

// 	data, err := h.TransactionRepository.UpdateTransaction(transaction)
// 	if err != nil {
// 		w.WriteHeader(http.StatusInternalServerError)
// 		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	w.WriteHeader(http.StatusOK)
// 	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
// 	json.NewEncoder(w).Encode(response)
// }

func SendMail(status string, transaction models.Transaction) {

	if status != transaction.StatusPayment && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "Housy booking status <neysatarigan@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var productName = transaction.House.Name
		var price = strconv.Itoa(transaction.House.Price)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
	  <html lang="en">
	  <head>
	  <meta charset="UTF-8" />
	  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	  <title>Document</title>
	  <style>
		h1 {
		color: brown;
		}
	  </style>
	  </head>
	  <body>
	  <h2>Product payment :</h2>
	  <ul style="list-style-type:none;">
		<li>Name : %s</li>
		<li>Total payment: Rp.%s</li>
		<li>Status : <b>%s</b></li>
	  </ul>
	  </body>
	</html>`, productName, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.User.Email)
	}
}

func (h *handlerTransaction) DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func convertResponseTransaction(u models.Transaction) transactiondto.ResponseTransaction {
	return transactiondto.ResponseTransaction{
		CheckIn:       u.CheckIn,
		CheckOut:      u.CheckOut,
		HouseId:       u.HouseId,
		UserId:        u.UserId,
		Total:         u.Total,
		StatusPayment: u.StatusPayment,
	}
}
