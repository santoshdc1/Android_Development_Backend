const express = require("express");
const Blog = require("../models/addblog");
const router = new express.Router();
const auth = require("../auth/auth");
const upload = require("../uploads/uploads");
//inserting product

router.post('/blog/insert', auth.verifyPeople, upload.single('thumbnail'), function (req, res) {
    // upload.single('blog_images'),
    const cusId = req.customerInfo._id;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;

    // const pprice = req.body.pprice;
    // const pquantity = req.body.pquantity;
    const thumbnail = req.file.filename;

    const data = new Blog({
        pname: pname,
        pdesc: pdesc,
        cusId: cusId,
        // pprice: pprice,
        // pquantity: pquantity,
        thumbnail: thumbnail,

    })
    data.save()
        .then(function () {
            console.log(req.body);
            res.json({ meg: "ok", success:true })
        })
        .catch(function () {
            console.log('sss');
            res.json({ meg: "something wrong!", success:false })
        })

})

//to show own blog
router.get("/blog/myblog", auth.verifyPeople, function (req, res) {
    Blog.find({ cusId: req.customerInfo._id })
        .then(function (myblog) {
            res.json(myblog)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})


router.get("/allblog", function (req, res) {
    
    Blog.find()
        .then(function (allblog) {
            res.json(allblog)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})


// router.get("/vlog/readmore", function (req, res) {
//     const pid = req.params.pid;
//     Vlog.findById(pid)
//         .populate('Comments.postedBy', 'username')
//         .then(function (result) {
//             console.log(result)
//             res.json(result)
//         })
//         .catch(function () {
//             res.json({ msg: "something went wrong!" });
//         })
// });

router.post("/comment", auth.verifyPeople, (req, res) => {
    const comment = { Text: req.body.commentText, postedBy: req.customerInfo._id };
    Blog.findByIdAndUpdate(req.body.blogId, {
        $push: { Comments: comment },
    })
        .then((docs) => {
            console.log("posted comment");
            res.json({ success: true, commentcount: docs.Comments.length });
        })
        .catch((e) => {
            res.json({ message: e, success: false });
        });
});



//to show single product
router.get("/blog/single/:pid", auth.verifyPeople, function (req, res) {
    const pid = req.params.pid;
    Blog.findOne({ _id: pid }).populate("cusId", "_id username").populate("Comments.postedBy", "username")
        .then(function (result) {
            res.json(result)
        })
        .catch(function () {
            res.json({ msg: "something went wrong" });
        })
})





//to update the blog post
router.put('/blog/update', auth.verifyPeople,upload.single('thumbnail'),  function (req, res) {
    // upload.single("blog_images"),
    // upload.single('blog_images'),
    const pid = req.body.pid;
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const thumbnail = req.file.filename;

    Blog.updateOne({ _id: pid }, {
        pname: pname,
        pdesc: pdesc,
        thumbnail: thumbnail,
    })
        .then(function () {
            res.json({ message: "Blog Updated", success: true })
        })
        .catch(function () {
            res.json({ message: "Something went wrong!" })
        })
})

//Blog delete
router.delete('/blog/delete/:pid', function (req, res) {
    const pid = req.params.pid;
    console.log('heiteddd');
    //if the blog are added by different users - ram, shyam
    // const cusId = req.customerInfo._id;
    Blog.deleteOne({ _id: pid })
        .then(function () {
            console.log('eeee');
            res.staus(200).json({ message: "Deleted Successfully" })
        })
        .catch(function () {
            res.json({ message: "Something went wrong!" })
        })
})

module.exports = router;