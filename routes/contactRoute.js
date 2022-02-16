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

//to show own blog
router.get("/contact/mycontact", auth.verifyPeople, function (req, res) {
    Contact.find({ cusId: req.customerInfo._id })
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})

router.get("/contact/allcontact", function (req, res) {
    Contact.find().populate("cusId",  "_id username")
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})

router.delete('/contact/delete/:pid', auth.verifyPeople, function (req, res) {
    const pid = req.params.pid;
    //if the blog are added by different users - ram, shyam
    const cusId = req.customerInfo._id;
    Contact.deleteOne({ _id: pid, cusId: cusId })
        .then(function () {
            res.json({ message: "Deleted Successfully" })
        })
        .catch(function(){
            res.json({ message: "Something went wrong!"})
        })
})

router.delete('/contact/deleteadmin',function (req, res) {
    // const pid = req.params.pid;
    //if the blog are added by different users - ram, shyam
    // const cusId = req.customerInfo._id;
    Contact.deleteOne({ })
        .then(function () {
            res.json({ message: "Deleted Successfully" })
        })
        .catch(function(){
            res.json({ message: "Something went wrong!"})
        })
})



module.exports = router;






