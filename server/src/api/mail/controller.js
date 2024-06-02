const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = require('./../../middlewares/mailer');
const errorDisplay = "(Error en el controlador de Mail)";

const sendMailPassReset = (email, code) => {
    return new Promise((resolve, reject) => {
        try {
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
        } catch (error) {
            reject(new Error(`Error al intentar enviar el correo de restablecimiento de contraseña ${errorDisplay}`, error));
        }
    });
};

module.exports = {
    sendMailPassReset,
};