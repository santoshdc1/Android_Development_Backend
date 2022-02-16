const express = require("express");
const EmailAddress = require("../models/emailaddressModels");
const router = new express.Router();
const auth = require("../auth/auth");

router.post('/emailaddress/insert', function (req, res) {
    const emailaddress = req.body.emailaddress;

    const data = new EmailAddress({
        emailaddress: emailaddress,
    })
    data.save()
        .then(function () {
            res.json({ meg: "ok", success: true })
        })
        .catch(function () {
            res.json({ meg: "something wrong!" })
        })

})

module.exports = router;