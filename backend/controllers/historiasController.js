const { Historia, Post } = require('../database/associations');

// Controlador para listar todas las historias
const listarhistorias = async (req, res) => {
  try {
    const historias = await Historia.findAll();
    res.json(historias);
  } catch (error) {
    console.error("Error al listar las historias:", error);
    res.status(500).json({ error: "Error al listar los historias" });
  }
};

// Controlador para crear una nueva historia
const crearhistoria = async (req, res) => {
  const Nombre_historia = req.body;
  console.log(Nombre_historia);
  try {
    await Historia.create(Nombre_historia);
    res.status(201).json(Nombre_historia);
  } catch (error) {
    console.error("Error al crear la historia:", error);
    res.status(500).json({ error: "Error al crear la historia" });
  }
};

// Controlador para obtener una historia por su ID
const obtenerhistoria = async (req, res) => {
  const historiaId = req.params.id;
  try {
    const historia = await historia.findByPk(historiaId);
    if (!historia) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }
    res.json(historia);
  } catch (error) {
    console.error("Error al obtener la historia:", error);
    res.status(500).json({ error: "Error al obtener la historia" });
  }
};

// Controlador para actualizar una historia por su ID
const actualizarhistoria = async (req, res) => {
  const historiaId = req.params.id;
  const Nombre_historia = req.body;
  try {
    const historia = await historia.findByPk(historiaId);
    if (!historia) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }
    
    await historia.update(Nombre_historia)
    
    res.json(historia);
  } catch (error) {
    console.error("Error al actualizar la historia:", error);
    res.status(500).json({ error: "Error al actualizar la historia" });
  }
};

// Controlador para eliminar una historia por su ID
const eliminarhistoria = async (req, res) => {
  const historiaId = req.params.id;
  try {
    const historia = await historia.findByPk(historiaId);
    if (!historia) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }
    await historia.destroy();
    res.json({ mensaje: "Historia eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la historia:", error);
    res.status(500).json({ error: "Error al eliminar la historia" });
  }
};

module.exports = {
    listarhistorias,
    crearhistoria,
    obtenerhistoria,
    actualizarhistoria,
    eliminarhistoria
}