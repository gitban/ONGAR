const { Adopcion, Post } = require('../database/associations');

// Controlador para listar todas las categorías
const listaradopciones = async (req, res) => {
  try {
    const adopciones = await Adopcion.findAll();
    res.json(adopciones);
  } catch (error) {
    console.error("Error al listar las categorías:", error);
    res.status(500).json({ error: "Error al listar los adopciones" });
  }
};

// Controlador para crear una nueva categoría
const crearadopcion = async (req, res) => {
  const Nombre_adopcion = req.body;
  console.log(Nombre_adopcion);
  try {
    await Adopcion.create(Nombre_adopcion);
    res.status(201).json(Nombre_adopcion);
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

// Controlador para obtener una categoría por su ID
const obteneradopcion = async (req, res) => {
  const adopcionId = req.params.id;
  try {
    const adopcion = await adopcion.findByPk(adopcionId);
    if (!adopcion) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(adopcion);
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

// Controlador para actualizar una categoría por su ID
const actualizaradopcion = async (req, res) => {
  const adopcionId = req.params.id;
  const Nombre_adopcion = req.body;
  try {
    const adopcion = await adopcion.findByPk(adopcionId);
    if (!adopcion) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    
    await adopcion.update(Nombre_adopcion)
    
    res.json(adopcion);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

// Controlador para eliminar una categoría por su ID
const eliminaradopcion = async (req, res) => {
  const adopcionId = req.params.id;
  try {
    const adopcion = await adopcion.findByPk(adopcionId);
    if (!adopcion) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    await adopcion.destroy();
    res.json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = {
    listaradopciones,
    crearadopcion,
    obteneradopcion,
    actualizaradopcion,
    eliminaradopcion
}