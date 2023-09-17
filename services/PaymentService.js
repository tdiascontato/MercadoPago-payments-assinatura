const axios = require("axios");

class PaymentService {
  async createPayment() {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const img = "../img/613480.jpg";
    const body = {
      /*payer_email: "test_user_2103390560@testuser.com",//email comprador*/
      items: [
        {
          title: "Dummy Title",//dinamyc
          description: "Dummy description",//dinamyc
          picture_url: img,
          category_id: "category123",//dinamyc
          quantity: 1,
          unit_price: 10
        }
      ],
      back_urls: {
        success: "http://www.google.com.br",
        failure: "http://www.cnn.com",
        pending: "http://www.times.com",
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`//token vendedor
      }
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";
    //assinatura
    const body = {
      reason: "Assinatura",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "BRL"
      },
      back_url: "https://google.com.br",
      payer_email: "test_user_2103390560@testuser.com"//email comprador
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`//token vendedor
      }
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
