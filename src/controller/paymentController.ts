import axios from "axios";
import { Request, Response } from "express";

const initPayment = async (req: Request, res: Response) => {
  const { total } = req.body;
  if (!total) {
    res.status(400).json("total is missing");
    return;
  }
  const cart = {
    id: "123",
    currency: "SAR",
    amount: 66,
    description: "Electronics",
  };

  const customer = {
    name: "admin",
    email: "admin@gmail.com",
    phone: "0555555555",
    street1: "123 Main St",
    city: "Anytown",
    state: "CA",
    country: "SAU",
    zip: "12345",
    IP: req.ip,
  };
  const url = {
    response: process.env.RESPONSE_URL,
    callback: process.env.CALLBACK_URL,
  };
  const data = {
    profile_id: process.env.PAYTABS_PROFILE_ID,
    tran_type: "sale",
    tran_class: "ecom",

    cart_id: cart.id,
    cart_currency: "SAR",
    cart_amount: cart.amount,
    cart_description: cart.description,

    hide_shipping: true,
    customer_details: customer,
    shipping_details: customer,

    return: url.response,
    callback: url.callback,

    lang: "ar",
    payment_methods: ["creditcard"],
    frame_mode: true,
  };
  try {
    const Response = await axios.post(
      "https://secure.paytabs.sa/payment/request",
      data,
      {
        headers: {
          Authorization: process.env.PAYTABS_API_KEY,
        },
      }
    );

    const result = {
      redirect_link: Response.data.redirect_url,
    };

    res.status(200).json({ redirect_url: result.redirect_link });
  } catch (e) {
    console.log(e);

    res.status(500).json("server error");
  }
};

const handleCallback = (req: Request, res: Response) => {
  console.log(req.body);
};

export { initPayment, handleCallback };
