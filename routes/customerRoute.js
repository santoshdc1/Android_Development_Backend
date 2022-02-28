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
                bio:"No bio",
                // address:"No address",
                country:"choose"
                 
                
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

