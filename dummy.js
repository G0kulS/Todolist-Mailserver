const nodemailer = require('nodemailer');
const mongodb = require("mongodb");
const URL = "mongodb+srv://dbuser:helloworld@cluster0.zwvcb.mongodb.net/Remainder?retryWrites=true&w=majority";
const DB = "Remainder";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: "unnamedbot2oo5@gmail.com",
      pass: "Liverpool@2019",
      clientId: "1038463972918-tlu739mbpl08tah8e8p3uq5to2kvh2mq.apps.googleusercontent.com",
      clientSecret: "WCAEDI34AoGnMTukh4RZ__wB",
      refreshToken: "1//04G8mQC7d3f__CgYIARAAGAQSNwF-L9IrGw9gIdFyuu2eYDTn31CRzMilorT-naE3CnTym01uljmn1KzorgzVuz51G-UZXf1-bWQ"
    }
  });

  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();


const message = {
                from: 'unnamedbot2oo5@gmail.com', // Sender address
                to: "samigokul474@gmail.com",         // List of recipients
                subject: `Remainder for task`, // Subject line
                text: `Hello \n\n It's time to start ${hour}-${min}. \n\n Use the  link below to registry the task completion or to cancel the task: \n\n http://localhost:3000/remainder/` // Plain text body
            };

            transporter.sendMail(message, function(err, info) {
                if (err) {
                  console.log(err)
                } else {
                  console.log(info);
                }})
    
