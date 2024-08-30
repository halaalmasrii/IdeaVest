
const Transaction = require('../models/transaction');
const Opportunity = require("../models/opportunity");
const mongoose=require('mongoose');
const stripe=require('stripe')('sk_test_51Ps8SDLB7H0EAB8wjeaq7kpDmdusgyBlXgq97eYWuWgRBxX8rBFRWe8gPpeOuvNmYMwI8Wj6gLzDTQPFf5VdlGmE00Trhfs9J7');


const createCheckoutSession= async (req, res) => {
    const opportunityId=req.params.opportinityId;
    const userId=req.user.id;
    console.log(opportunityId);
    
    try {
        const opportunity=await Opportunity.findById(opportunityId);
        if (!opportunity){
            return res.status(404).send('Opportunity not found');
        }
    const session = await stripe.checkout.sessions.create({
        
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: opportunity.opportunityname,
                    },
                    unit_amount: opportunity.reqfunding * 100, 
                },
                quantity: 1,
            
            }],
            metadata:{
                opportunityId:`${opportunity._id}`,
                userId:`${userId}`
            },
            mode: 'payment',
            success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&opportunityId=${opportunityId}`,
            cancel_url: `http://localhost:3000/cancel`,
        });
    res.json({ id: session.id });
    } catch (error) {
     res.status(500).send(error.message);}
    };
const successfulPayment = async (req, res) => {
    const  session_id = req.query.session_id;
   
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const opportunityId = session.metadata.opportunityId;
        if(session.status === "completed")
            {return res.status(201).send("session completed");
            }
        
        const opportunity = await Opportunity.findById(opportunityId);
        let bought_by = opportunity.bought_by;
        bought_by = [...bought_by,session.metadata.userId];
        opportunity.bought_by = bought_by;
        await opportunity.save()
        const transaction = new Transaction({
            price: session.amount_total / 100, 
            opportunityId: opportunityId,
            userId: req.user.id,
        
        });
       const savedtr= await transaction.save();
        return res.status(201).json(savedtr);
    } catch (error) {
        res.status(500).send('Error processing payment');
    }};
const getUserTransactionDetails = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id }).populate('opportunityId');
        res.json(transactions);
    } catch (error) {
        res.status(500).send('Error fetching transaction details');
    }
};
module.exports= {
    createCheckoutSession,
    successfulPayment,
    getUserTransactionDetails,
};