const { Miembro, Post } = require('../database/associations');

// Controlador para listar todas las categorías
const listarmiembros = async (req, res) => {
  try {
    const miembros = await Miembro.findAll();
    res.json(miembros);
  } catch (error) {
    console.error("Error al listar las categorías:", error);
    res.status(500).json({ error: "Error al listar los miembros" });
  }
};

// Controlador para agregar miembro
const crearmiembro = async (req, res) => {
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

// Controlador para obtener una categoría por su ID
const obtenermiembro = async (req, res) => {
  const miembroId = req.params.id;
  try {
    const miembro = await miembro.findByPk(miembroId);
    if (!miembro) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(miembro);
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

// Controlador para actualizar una categoría por su ID
const actualizarmiembro = async (req, res) => {
  const miembroId = req.params.id;
  const Nombre_miembro = req.body;
  try {
    const miembro = await miembro.findByPk(miembroId);
    if (!miembro) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    
    await miembro.update(Nombre_miembro)
    
    res.json(miembro);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

// Controlador para eliminar una categoría por su ID
const eliminarmiembro = async (req, res) => {
  const miembroId = req.params.id;
  try {
    const miembro = await miembro.findByPk(miembroId);
    if (!miembro) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    await miembro.destroy();
    res.json({ mensaje: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

module.exports = {
    listarmiembros,
    crearmiembro,
    obtenermiembro,
    actualizarmiembro,
    eliminarmiembro
}