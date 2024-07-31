const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({

 /*user_id: {
    type: String,
    //required: true,
  },*/
  opportunityname:{
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    
 },
  reqfunding: {
    type: Number,
    
  },

fundingamount: {
  type: Number,
 
},
user:{
  type: mongoose.Schema.ObjectId,
  ref :"User",
  required: true

},
role:{
  type:String,
  required : true
},
isDeleted:{
  type:Boolean,
  default:false
},
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;