//Config dotenv:
require('dotenv').config()
//Mongo Db atlas config:
const mongoose = require("mongoose");
const URI =  process.env.DB_URI
mongoose.connect(URI, (err) => {
 err ? console.log("There is an error" + err) : console.log("Mongo Atlas has just connected");
})
