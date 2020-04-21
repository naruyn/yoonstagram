import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${ adjectives[randomNumber]} ${ nouns[randomNumber]}`;
}

const sendMail = (email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SENDMAIL_USERNAME,
            pass: process.env.SENDMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    return transporter.sendMail(email, function(error, info){
        if(error){
            console.log(error);
        }
    });
};

export const sendSecretMail = (address, secret) => {
    const email ={
        from: "devnaruyn@naver.com",
        to: address,
        subject: "Login Secret for Yoonstagram",
        html: `Hello! Your login secret key is <b>${secret}</b><br/>Copy paste on th app/website.`
    }
    return sendMail(email);
}

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);