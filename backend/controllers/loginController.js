const { Login, Post } = require('../database/associations');

// Controlador para agregar miembro
const login = async (req, res) => {
  const Nombre_miembro = req.body;
  console.log(Nombre_miembro);
  try {
    await Miembro.create(Nombre_miembro);
    res.status(201).json(Nombre_miembro);
  } catch (error) {
    console.error("Error al agregar", error);
    res.status(500).json({ error: Nombre_miembro + "Error al agregar miembro" });
  }
};

module.exports = {
    login,
}