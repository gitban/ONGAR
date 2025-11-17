const { Usuario, Post } = require('../database/associations');

// Controlador para listar todas las categorías
const listarusuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al listar las categorías:", error);
    res.status(500).json({ error: "Error al listar los usuarios" });
  }
};

// Controlador para obtener una usuario por su ID
const obtenerusuario = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

// Controlador para actualizar la informacion de un usuario
const actualizarusuario = async (req, res) => {
  const usuarioId = req.params.id;
  const Nombre_usuario = req.body;
  try {
    const usuario = await usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    
    await usuario.update(Nombre_usuario)
    
    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

// Controlador para eliminar un usuario por su ID
const eliminarusuario = async (req, res) => {
  const usuarioId = req.params.id;
  try {
    const usuario = await usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    await usuario.destroy();
    res.json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = {
    listarusuarios,
    obtenerusuario,
    actualizarusuario,
    eliminarusuario
}