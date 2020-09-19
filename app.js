const express = require('express');
const cron = require("node-cron");
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();

cron.schedule("0 0 1 1-12 *", function(){
      console.log(`At 00:00 on day-of-month 1 in every month from January through December`);
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: `${process.env.NODEMAILER_TRANSPORT_SERVICE_USER}`,
              pass: `${process.env.NODEMAILER_TRANSPORT_SERVICE_PASS}`
          }
      });

      const mailOptions = {
          from: `${process.env.NODEMAILER_TRANSPORT_SERVICE_USER}`,
          to: `${process.env.NODEMAILER_TRANSPORT_SERVICE_TO}`,
          subject: 'Sending Email using Node.js - Cron Job', 
          text: 'That was easy!'
      };

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
      });
});

app.listen(`${process.env.APP_PORT}`, () => {
  console.log(`App listening at http://localhost:${process.env.APP_PORT}`)
});