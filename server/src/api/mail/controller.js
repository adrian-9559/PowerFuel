const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = require('./../../middlewares/mailer');

const sendMailPassReset = (email, code) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Olvidaste tu contraseña",
            text: `Tu codigo para resetear tu contraseña es: ${code}`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = {
    sendMailPassReset,
};