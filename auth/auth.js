const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModels");
// const Admin = require("../models/adminModels");

module.exports.verifyPeople = function(req,res,next){
    try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const data = jwt.verify(token,"anysecretkey");
     console.log(data);
    Customer.findOne({_id : data.cusId})
    .then(function(result){
        console.log(result);
        req.customerInfo = result;
        next();
    })
    .catch(function(e){
        res.json({error:e})
    })
    }
    catch(e){
        res.json({error : "Invalid access!!.."})
    }


}



// module.exports.verifyAdmin = function(req,res,next){
//     try{

 
//     const token = req.headers.authorization.split(" ")[1];
    
//     const data = jwt.verify(token,"anysecretkey");
//     Admin.findOne({_id : data.cusid})
//     .then(function(result){
//         req.adminInfo = result;
//         next();
//     })
//     .catch(function(e){
//         res.json({error : "Admin Invalid access"})
//     })
//     }
//     catch(e){
//         res.json({error : "Admin Invalid access"})
//     }
// }