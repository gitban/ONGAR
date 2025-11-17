const { Administrador, Post } = require('../database/associations');

// Controlador para listar todas las categorías
const listaradministradores = async (req, res) => {
  try {
    const administradores = await Administrador.findAll();
    res.json(administradores);
  } catch (error) {
    console.error("Error al listar las categorías:", error);
    res.status(500).json({ error: "Error al listar los administradores" });
  }
};

// Controlador para obtener una administrador por su ID
const obteneradministrador = async (req, res) => {
  const administradorId = req.params.id;
  try {
    const administrador = await administrador.findByPk(administradorId);
    if (!administrador) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(administrador);
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

// Controlador para actualizar la informacion de un administrador
const actualizaradministrador = async (req, res) => {
  const administradorId = req.params.id;
  const Nombre_administrador = req.body;
  try {
    const administrador = await administrador.findByPk(administradorId);
    if (!administrador) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    
    await administrador.update(Nombre_administrador)
    
    res.json(administrador);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

// Controlador para eliminar un administrador por su ID
const eliminaradministrador = async (req, res) => {
  const administradorId = req.params.id;
  try {
    const administrador = await administrador.findByPk(administradorId);
    if (!administrador) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    await administrador.destroy();
    res.json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = {
    listaradministradores,
    obteneradministrador,
    actualizaradministrador,
    eliminaradministrador
}