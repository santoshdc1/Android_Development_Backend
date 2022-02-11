const mongoose = require("mongoose");
const Customer = require("./customerModels");
const EmailAddress = new mongoose.Schema({
    emailaddress:{
      type: String  
    },
    created: {
      type: Date,
      default: Date.now,
  },
})
module.exports=mongoose.model("EmailAddress",EmailAddress);
