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

//Envío el correo con los datos recibidos
const sendMail = async (req, res) => {

  const { nombre, apellido, email, telefono, mensaje } = req.body;

  // Estructura del correo
  const mailOptions = {
    from: `"${nombre}" <${process.env.EMAIL_USER}>`, // El remitente siempre debe ser tu cuenta autenticada
    to: process.env.EMAIL_USER, // A dónde querés que te llegue el aviso
    replyTo: email, // Permite que al darle "Responder" le escribas al usuario
    subject: `Nuevo mensaje de contacto: ${apellido}, ${nombre}`,
    html: `
    <div style="border:1px solid gray; padding:10px;border-radius:2px;">
    <h2>Solicitud de contacto recibida desde el sito web de la ONG Animales Ramallo</h2>
      <h3>Detalles del contacto:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${apellido}, ${nombre}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${telefono}</li>
      </ul>
      <h3 style="color:blue;">Mensaje:</h3>
      <p>${mensaje}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar:', error);
    res.status(500).json({ message: 'Hubo un error al procesar el envío' });
  }
};

module.exports = { sendMail };
