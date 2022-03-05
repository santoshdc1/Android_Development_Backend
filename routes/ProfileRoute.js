const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModels");
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");

const router = new express.Router();

router.put("/profile/update", auth.verifyPeople, upload.single('thumbnail'),  function (req, res) {
    console.log(req.customerInfo._id);
    const id = req.customerInfo._id;
    const email = req.body.email;
    const fullname = req.body.fullname;
    const bio = req.body.bio;
    const country = req.body.country;
    const address = req.body.address;
    const contact = req.body.contact;
    const thumbnail = req.file.filename;
    Customer.findByIdAndUpdate({ _id: id }, {
        fullname: fullname, 
        email: email,
        address: address, 
        contact: contact,
        bio:bio,
        thumbnail :thumbnail,
        country: country
    })
        .then(function () {
            res.json({ msg: "Updated!!", success: true })
        })
        .catch(function () {
            res.json({ msg: "Try again!!", success: false })
        })
})

router.get('/profile/get/:id', function (req, res) {
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
    const cusid = res.body.id;
    Customer.deleteOne({ _id: cusid })
        .then(function () {
            res.json({ msg: "deleted sucess!!" })
        })
        .catch(function () {
            res.json({ msg: "try again!!!!!!!!!!" })
        })

})

router.post("/news/upload", upload.single('ab_cd'), function (req, res) {
    if (req.file == undefined) {
        return res.json({
            message: "Invalid file format. Only jpeg and png allowed"
        })
    }

})



module.exports = router;