const nodemailer = require('nodemailer');
const mongodb = require("mongodb");
const URL = "mongodb+srv://dbuser:helloworld@cluster0.zwvcb.mongodb.net/Remainder?retryWrites=true&w=majority";
const DB = "Remainder";

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "unnamedbot2oo5@gmail.com", 
        pass: "Liverpool@2019" 
    }
  });

const message = {
                from: 'unnamedbot2oo5@gmail.com', // Sender address
                to: "samigokul474@gmail.com",         // List of recipients
                subject: `Remainder for task`, // Subject line
                text: `Hello \n\n It's time to start. \n\n Use the  link below to registry the task completion or to cancel the task: \n\n http://localhost:3000/remainder/` // Plain text body
            };

            transport.sendMail(message, function(err, info) {
                if (err) {
                  console.log(err)
                } else {
                  console.log(info);
                }})
    
