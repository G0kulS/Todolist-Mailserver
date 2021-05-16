const nodemailer = require('nodemailer');
const mongodb = require("mongodb");
const URL = "mongodb+srv://dbuser:helloworld@cluster0.zwvcb.mongodb.net/Remainder?retryWrites=true&w=majority";
const DB = "Remainder";
require('dotenv').config()
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

  
 (async() => {
    let connection = await mongodb.connect(URL);
    let db = connection.db(DB);
    let task = await db.collection("Task").find({"Completed":false}).toArray();
    if(task.length!=0)
    {
      let date  = new Date();
      let currentmonth = date.getUTCMonth();
      let currentdate = date.getUTCDate();
      let currenthour = date.getUTCHours();
      let currentmin = date.getUTCMinutes();

       task.map(async(i)=>{
      let temp = i.TaskTime.split(":");    
      let month = i.Taskmonth;
      let date = i.Taskdate;
      let hour = +temp[0];
      let min = +temp[1]

console.log("current time :",currentmonth,currentdate,currenthour,currentmin);
hour -=5;
if(hour<0)
{
    hour = 24 + (hour);
    date--;
    if(date<=0)
    {
     var d=new Date(); // current date
     d.setDate(1); // going to 1st of the month
     d.setHours(-1);
     date = d.getDate();
     month--;
    }
}

if(min-30<0)
{
    min = 60 + (min-30);
    --hour;
    if(hour<0)
    {
        hour = 24 + (hour);
        date--;
        if(date<=0)
        {
         var d=new Date(); // current date
         d.setDate(1); // going to 1st of the month
         d.setHours(-1);
         date = d.getDate();
         month--;
        }
    }
}
else
{
    min = min -30 ; 
}

console.log("task time :",month,date,hour,min);
      
let rangem = currentmonth ; 
let ranged = currentdate ; 
let rangeh = currenthour ; 
let rangemin = currentmin ; 

if(rangemin+10>=60)
{
    rangemin = 60 - (rangemin+10);
    rangeh++;
    if(rangeh>=24)
    {
        rangeh = (rangeh)-24;
        ranged++;
        if(ranged>+ new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toString().split(" ")[2])
        {
         
         ranged = 1
         rangem++;
        }
    }
}
else
{
    rangemin = rangemin +10 ; 
}

console.log(rangem,ranged,rangeh,rangemin);
          if((month>=currentmonth&&date>=currentdate&&hour>=currenthour&&min>=currentmin)&&(month<=rangem&&date<=ranged&&hour<=rangeh&&min<=rangemin))
          {
             let user = await db.collection("User").find({_id:mongodb.ObjectID(i.Userid)}).toArray();
             console.log(user);
             const message = {
                from: 'unnamedbot2oo5@gmail.com', // Sender address
                to: user[0].email,         // List of recipients
                subject: `Remainder for task-${i.Taskname}`, // Subject line
                text: `Hello ${user[0].Name}, \n\n It's about time to start ${i.Taskname}. \n\n Use the  link below to registry the task completion or to cancel the task: \n\n https://objective-goodall-0f6a6a.netlify.app/remainder/${i._id}` // Plain text body
            };
            transporter.sendMail(message, function(err, info) {
                if (err) {
                  console.log(err)
                } else {
                  console.log(info);
                }
            });
          }
      })
    }
    connection.close();
 })();
