import { Request,Response,NextFunction } from 'express';
import nodemailer from 'nodemailer';
import { Fmsg } from '../utils/Rmsg';
import config from 'config';

//send mail
export const sendMailController = async (data:any) => { 
     try {
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: config.get<string>('emailAuthUser'),
    pass: config.get<string>('emailAuthPassword')
  }
});

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: config.get<string>('emailAuthUser'), // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html:data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  

    } catch (e: any) {
         console.log(e);
    }
};