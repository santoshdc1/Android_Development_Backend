
const mongoose = require("mongoose");
const Customer = require("./customerModels");
const Contact = new mongoose.Schema({
    contactname:{
      type: String  
    },
    contact:{
        type:String
    },
    contactemail:{
        type: String
    },
    contactmessage:{
        type: String
    },

    created: {
        type: Date,
        default: Date.now,
    },
    cusId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }
})
// {timestamps:true})
module.exports=mongoose.model("Contact",Contact);
