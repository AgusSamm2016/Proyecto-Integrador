const nodemailer = require("nodemailer")
const dotenv = require("dotenv").config()
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.nodeuser,
      pass: process.env.nodepass
    }
  });

  module.exports = transport