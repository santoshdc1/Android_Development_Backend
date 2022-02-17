const req = require("express/lib/request");
const { model } = require("mongoose");
const multer = require("multer");


//file upload
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './blog_images')
    },
    filename : function(res, file, cb){
        cb(null, Date.now() +file.originalname)
    },

})

//code for filtering file - jpg
// const filter = function(req,file,cb){
//     if(file.mimetype == 'image/png' || file.mimetype=='image/jpeg' || file.mimetype=='image/jpg'){
//         //correct format
//         cb(null, true)
//     }
//     else{
//         //incorrect format
//         cb(null, false)
//     }
// }

const upload = multer({
    storage : storage,
    // fileFilter : filter

})

module.exports = upload;