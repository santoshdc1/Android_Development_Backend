const express = require("express");
const Contact = require("../models/contactModels");
const router = new express.Router();
const auth = require("../auth/auth");


router.post('/contact/insert',auth.verifyPeople,  function (req, res) {
    // 
    const cusId = req.customerInfo;
    const contactname = req.body.contactname;
    const contact = req.body.contact;
    const contactemail = req.body.contactemail;
    const contactmessage = req.body.contactmessage;

    const data = new Contact({
        contactname: contactname,
        contact: contact,
        contactemail: contactemail,
        contactmessage: contactmessage,
        cusId: cusId,
    })
    data.save()
        .then(function () {
            res.json({ meg: "ok", success: true })
        })
        .catch(function () {
            res.json({ meg: "something wrong!" })
        })

})
