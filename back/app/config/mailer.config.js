const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user:"contactszq@gmail.com", 
    pass:"qlen vmzl cjtr nlac"
  }
});

module.exports = transporter;
