const nodemailer = require('nodemailer');
require('dotenv').config();

// Controlador para enviar correo

// Lógica de transporter.sendMail...
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true para 465, false para otros puertos service: 'gmail', // Nodemailer ya conoce los hosts de Gmail
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // La contraseña de aplicación
  },
});

// Verificar que la configuración sea correcta
transporter.verify((error, success) => {
  if (error) {
    console.error("Error en el transporter:", error);
  } else {
    console.log("Servidor listo para enviar correos");
  }
});

module.exports = { transporter };