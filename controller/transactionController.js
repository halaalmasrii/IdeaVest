const Transaction = require("../models/transaction");
const mongoose = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51Ps8SDLB7H0EAB8wjeaq7kpDmdusgyBlXgq97eYWuWgRBxX8rBFRWe8gPpeOuvNmYMwI8Wj6gLzDTQPFf5VdlGmE00Trhfs9J7"
);

const createTransaction = async (req, res) => {
  const opportunityId = req.params.opportunityId;
  const userId = req.user._id;
  const price = 10000; 

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Access to Opportunity Information",
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    const transaction = new Transaction({
      price,
      opportunityId,
      userId, 
    });
    await transaction.save();

    return res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTransaction,
};
