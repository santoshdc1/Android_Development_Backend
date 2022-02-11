const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
    pname:{
      type: String  
    },
    pdesc:{
        type:String
    },
    cusId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'customer'
  },

  thumbnail:{
        type: String
    },

    created: {
        type: Date,
        default: Date.now,
    },
    Comments: [
        {
          Text: String,
          postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    
})
module.exports=mongoose.model("Blog",Blog);
