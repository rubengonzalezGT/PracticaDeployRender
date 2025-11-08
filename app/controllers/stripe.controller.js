// stripe.controller.js
const { secretKey } = require("../config/stripe.config");
const Stripe = require("stripe");
const stripe = Stripe(secretKey);
const db = require("../models");
const Cliente = db.clientes;  

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, description, clienteId } = req.body;

    
    if (!amount || !currency || !clienteId) {
      return res.status(400).json({ error: "Faltan datos requeridos (amount, currency, clienteId)" });
    }

   
    const paymentIntent = await stripe.paymentIntents.create({
      amount,  // El monto debe estar en centavos (USD * 100)
      currency,
      description,
      automatic_payment_methods: { enabled: true }, 
    });

    
    const paymentIntentId = paymentIntent.id;


    await Cliente.update(
      { transaccionStripe: paymentIntentId },
      { where: { id: clienteId } }  
    );

    
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntentId  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
