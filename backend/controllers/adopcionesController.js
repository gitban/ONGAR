const { Adopcion, Post } = require('../database/associations');
const transporter = require('./mailController');

// Controlador para listar todas las adopciones
const listaradopciones = async (req, res) => {
  const { id_animal } = req.query;

  let filtro = {};

  if (id_animal) {
    filtro.id_animal = id_animal;
  }

  try {
    const adopciones = await Adopcion.findAll({ where: filtro });
    res.json(adopciones);
  } catch (error) {
    console.error("Error al listar las adopciones:", error);
    res.status(500).json({ error: "Error al listar los adopciones" });
  }
};

// Controlador para crear una nueva adopcion
const crearadopcion = async (req, res) => {
  const Nombre_adopcion = req.body;
  try {
    await Adopcion.create(Nombre_adopcion);
    res.status(201).json(Nombre_adopcion);

    
  } catch (error) {
    console.error("Error al crear la adopcion:", error);
    res.status(500).json({ error: "Error al crear la adopcion" });
  }
  try {
    //Envío el correo con los datos recibidos
    const { id_animal, nombre_animal, nombre_apellido, email, direccion, telefono, mensaje } = req.body;
  
    // Estructura del correo
    const mailOptions = {
      from: `"${nombre_apellido}" <${process.env.EMAIL_USER}>`, // El remitente siempre debe ser tu cuenta autenticada
      to: process.env.EMAIL_USER, // A dónde querés que te llegue el aviso
      replyTo: email, // Permite que al darle "Responder" le escribas al usuario
      subject: `Nueva solicitud de adopción de: ${nombre_apellido}`,
      html: `
      <div style="border:1px solid gray; padding:10px;border-radius:2px;">
      <h2>Solicitud de adopcion recibida desde el sito web de la ONG Animales Ramallo</h2>
        <h3>Detalles de la solicitud:</h3>
        <ul>
          
          <h2> <a href='http://localhost:5173/adopciones/detalle/${nombre_animal}'><strong>Nombre de Animal:</strong> ${nombre_animal}</a> </h2>
          <li><strong>Nombre:</strong> ${nombre_apellido}</li>
          <li><strong>Direccion:</strong> ${direccion}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Teléfono:</strong> ${telefono}</li>
        </ul>
        <h3 style="color:blue;">Mensaje:</h3>
        <p>${mensaje}</p>
        </div>
      `
    };
  
    await transporter.transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar:', error);
    res.status(500).json({ message: 'Hubo un error al procesar el envío' });
  }
};

// Controlador para obtener una adopcion por su ID
const obteneradopcion = async (req, res) => {
  const adopcionId = req.params.id;
  try {
    const adopcion = await Adopcion.findByPk(adopcionId);
    if (!adopcion) {
      return res.status(404).json({ error: "Adopcion no encontrada" });
    }
    res.json(adopcion);
  } catch (error) {
    console.error("Error al obtener la adopcion:", error);
    res.status(500).json({ error: "Error al obtener la adopcion" });
  }
};

// Controlador para actualizar una adopcion por su ID
const actualizaradopcion = async (req, res) => {
  const adopcionId = req.params.id;
  const Nombre_adopcion = req.body;
  try {
    const adopcion = await Adopcion.findByPk(adopcionId);
    if (!adopcion) {
      return res.status(404).json({ error: "Adopcion no encontrada" });
    }

    await adopcion.update(Nombre_adopcion)

    res.json(adopcion);
  } catch (error) {
    console.error("Error al actualizar la adopcion:", error);
    res.status(500).json({ error: "Error al actualizar la adopcion" });
  }
};

// Controlador para eliminar una adopcion por su ID
const eliminaradopcion = async (req, res) => {
  const adopcionId = req.params.id;
  try {
    const adopcion = await Adopcion.findByPk(adopcionId);
    if (!adopcion) {
      return res.status(404).json({ error: "Adopcion no encontrada" });
    }
    await adopcion.destroy();
    res.json({ mensaje: "Adopcion eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la adopcion:", error);
    res.status(500).json({ error: "Error al eliminar la adopcion" });
  }
};

module.exports = {
  listaradopciones,
  crearadopcion,
  obteneradopcion,
  actualizaradopcion,
  eliminaradopcion
}