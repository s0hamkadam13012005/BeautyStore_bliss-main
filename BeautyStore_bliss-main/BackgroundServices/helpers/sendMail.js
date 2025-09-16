import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const createTransporter = (config) => {
  const transporter = nodemailer.createTransport(config);
  return transporter;
}
/*
This function creates a transporter (basically a connection object to the email service).

nodemailer.createTransport(config) takes in SMTP (Simple Mail Transfer Protocol) settings.

The returned transporter is what we’ll use to actually send the emails.
*/

let configuration = {
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD
  }
}

/*
service: "gmail" → tells Nodemailer to use Gmail’s SMTP server.

host: "smtp.gmail.com" → Gmail’s mail server.

port: 587 → the SMTP port for TLS (secure connection).

requireTLS: true → forces TLS encryption.

auth: contains your email + password (stored safely in .env file).

So basically, this is the "login details" for the Gmail account that will send the emails.
*/


const sendMail = async(messageoption)=>{
  const transporter = createTransporter(configuration);
  await transporter.verify();

  await transporter.sendMail(messageoption,(err,info)=>{
    if(err){
      console.log(err);
    }
    
      console.log("Email sent successfully",info.response);
    
  })
}

export default sendMail;