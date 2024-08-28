const Transaction=require("../models/transaction");
const mongoose=require("mongoose");
const stripe = require('stripe')('sk_test_51Pr5at04wae36xQbj1bEGxrHqoBaWcAAit2scMDFjkZ84Ecy8QzzutD4kyaWuylDeydTAdevxmNEuKlQFEFXWVIC00omQTlfUP'); // أدخل مفتاح Stripe الخاص بك هنا
const createTransaction = async (req, res) => {
    const { price, opportunityId, userId } = req.body;    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
             price_data: {
            currency: 'usd',
            product_data: {
             name: 'Opportunity Purchase', 
                        },
             unit_amount: parseInt(price) * 100, 
                    },
             quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/succes',
            cancel_url: 'http://localhost:3000/cancel',
        })
        const transaction = new Transaction({ price, opportunityId, userId });
        await transaction.save();
        res.json({ id: session.id }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createTransaction,
};




