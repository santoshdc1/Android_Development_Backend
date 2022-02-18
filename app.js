const express = require("express");

const app = express();


const cors = require('cors');
app.use(cors());

//now the folder is publicy accesible
app.use(express.static(__dirname+'/blog_images')); //here blog_image is my folder name

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./database/db");
const customerRoute = require("./routes/customerRoute");
app.use(customerRoute);

const blogRoute=require("./routes/blogRoute");
app.use(blogRoute);

const contactRoute=require("./routes/contactRoute");
app.use(contactRoute);

const emailaddressRoute=require("./routes/emailaddressRoute");
app.use(emailaddressRoute);

const ProfileRoute = require("./routes/ProfileRoute");
app.use(ProfileRoute);






app.listen("90");