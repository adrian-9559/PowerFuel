require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = null;
//  = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT, 
//     secure: true, 
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSEMAIL 
//     }
// });

// transporter.verify().then(() => {
//     console.log('Preparado para mandar mensajes por email');
// })




module.exports = transporter;