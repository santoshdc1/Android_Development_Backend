const { Module } = require("module");
const mongoose = require("mongoose");
const upload = require("../uploads/uploads");
const Customer = mongoose.model("Customer", {
    username: {
        type: String
    },
    password: {
        type: String
    },
    fullname: {
        type: String
    }, email: {
        type: String
    },
    contact: {
        type: String
    }, 
    address: {
        type: String

    },
    thumbnail: {
        type: String
    },
    bio:{
        type:String
        
    },
    country:{
        type: String
    },

    created: {
        type: Date,
        default: Date.now,
    },
})
module.exports = Customer;
