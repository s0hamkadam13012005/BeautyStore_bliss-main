import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './utils/db.js';
import cron from 'node-cron';
dotenv.config();
const app = express();

const PORT = process.env.PORT;

const services = () =>{
  cron.schedule('* * * * * *',() => {
    //console.log('running a task every second');
  })
}

services();

app.listen(PORT,()=>{
    console.log(`Background Service is running on PORT ${PORT}`);
    dbConnection();
})