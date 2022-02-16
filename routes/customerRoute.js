const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModels");
const auth = require("../auth/auth");
// const { estimatedDocumentCount } = require("../models/customerModels");
// const { route } = require("express/lib/application");
const upload = require("../uploads/uploads");

const router = new express.Router();
// route for customer registration
router.post("/customer/register", function (req, res) {
    // upload.single('pimage'),

    const username = req.body.username;
    Customer.findOne({ username: username }).then(function (customerData) {
        //if the username is in the database
        if (customerData != null) {
            res.json({ message: "Username already exists!" })
            return;
        }
        //now it means we are ready for registation
        const password = req.body.password;
        bcryptjs.hash(password, 10, function (e, hashed_pw) {
            const email = req.body.email;
            const contact = req.body.contact;
            const fullname = req.body.fullname;
            // const country = req.body.country;
            // const address = req.body.address;
            // const lastname = req.body.lastname;
            // const bio = req.body.bio;
            // const pimage = req.body.pimage;
            const cdata = new Customer({
                username: username,
                password: hashed_pw,
                email: email,
                fullname: fullname,
                contact: contact,
                // address: address,
                // lastname: lastname,
                // bio: bio,
                // country:country,
                // pimage:pimage,
                // profile_image : req.file.path
            })
            cdata.save()
                .then(function () {
                    res.json({ message: "Registered Success!", success: true })
                })
                .catch(function (e) {
                    res.json(e)
                })

        })
    })
})

router.get("/user", function (req, res) {
    Customer.find().populate('cusId')
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})



// router.delete('/customer/delete/:id12', function(req, res){
//     const myid = req.params.id12;
//     User.findByIdAndDelete(myid).then().catch();
// })

//login routes -  for customer
router.post("/customer/login", function (req, res) {
    const username = req.body.username;
    //select * from customer where username = "admin"
    Customer.findOne({ username: username })
        .then(function (customerData) {
            //console.log(customerData);
            if (customerData === null) {
                return res.json({ message: "invalid", success: false })
            }
            //need to check password
            const password = req.body.password;
            bcryptjs.compare(password, customerData.password, function (e, result) {
                //true correct pw, false = incorrect pw
                if (result === false) {
                    return res.json({ message: "Invalid message", success: false })
                }
                // ticket generate - jsonwebtoken
                const token = jwt.sign({ cusId: customerData._id }, "anysecretkey");
                res.json({ token: token, message: "success", username: username, success: true });


            })


        })

})





// customer profile update
router.put("/customer/profile/update",function (req, res) {
    //console.log(req.customerInfo._id);
    // const id = req.params.id;
    const email = req.body.email;
    const fullname = req.body.fullname;
    const pid = req.body.pid;
    
    // const lastname = req.body.lastname;
    // const bio = req.body.bio;
    // const username = req.body.username
    // const address = req.body.address;
    // const contact = req.body.contact;
    // const pimage = req.body.pimage;
    Customer.findByIdAndUpdate({ _id: pid }, { 
        // username: username, 
        email: email, 
        // address: address, 
        // contact: contact, 
        fullname: fullname, 
        // lastname: lastname, 
        // bio:bio, 
        // pimage :pimage 
    })
        .then(function () {
            res.json({ msg: "Updated!!", success: true })
        })
        .catch(function () {
            res.json({ msg: "Try again!!", success: false })
        })
})

router.get('/profile/get/:id', auth.verifyPeople, function (req, res) {
    Customer.findOne({ _id: req.params.id }).then(result => {
        res.json(result);
    }).catch(e => {
        res.json(e)
    })
})

//customer delete

router.delete("/customer/profile/delete", auth.verifyPeople, function (req, res) {
    // console.log(customerInfo)
    const id = req.customerInfo._id;
    Customer.findByIdAndDelete(id)
        .then(function () {
            res.json({ msg: "delete success!!" })
        })
        .catch(function () {
            res.json({ msg: "try again!!" })
        })

})

router.delete("/customer/delete", auth.verifyPeople, function (req, res) {
    // const id = req.adminInfo._id;
    const cusId = res.body.id;
    Customer.deleteOne({ _id: cusId })
        .then(function () {
            res.json({ msg: "deleted sucess!!" })
        })
        .catch(function () {
            res.json({ msg: "try again!!!!!!!!!!" })
        })

})

router.post("/news/upload", upload.single('ab_cd'), function (req, res) {
    // console.log(req.file);
    if (req.file == undefined) {
        return res.json({
            message: "Invalid file format. Only jpeg and png allowed"
        })
    }
    //code after success

})




module.exports = router;