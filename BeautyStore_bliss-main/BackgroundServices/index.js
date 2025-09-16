import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './utils/db.js';
import cron from 'node-cron';
import sendWelcomeEmail from './EmailServices/sendWelcomeEmail.js';
import sendPendingOrderEmail from './EmailServices/sendPendingOrderEmail.js';
import sendDeliveredOrderEmail from './EmailServices/sendDeliveredOrderEmail.js';
dotenv.config();
const app = express();

const PORT = process.env.PORT;

const services = () =>{
  cron.schedule('* * * * * *',() => {
    //console.log('running a task every second');
    sendWelcomeEmail();
    sendPendingOrderEmail();
    sendDeliveredOrderEmail();
  })
}

const promotion = () =>{
  cron.schedule('30 5  * * 5 ',() => {
    sendPromotionEmail();
  })
}
services();

app.listen(PORT,()=>{
    console.log(`Background Service is running on PORT ${PORT}`);
    dbConnection();
})