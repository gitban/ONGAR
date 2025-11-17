const { Donacion, Post } = require('../database/associations');

// Controlador para listar todas las donaciones
const listardonaciones = async (req, res) => {
  try {
    const donaciones = await Donacion.findAll();
    res.json(donaciones);
  } catch (error) {
    console.error("Error al listar las donaciones:", error);
    res.status(500).json({ error: "Error al listar los donaciones" });
  }
};

// Controlador para crear una nueva donacion
const creardonacion = async (req, res) => {
  const Nombre_donacion = req.body;
  console.log(Nombre_donacion);
  try {
    await Donacion.create(Nombre_donacion);
    res.status(201).json(Nombre_donacion);
  } catch (error) {
    console.error("Error al crear la donacion:", error);
    res.status(500).json({ error: "Error al crear la donacion" });
  }
};

// Controlador para obtener una donacion por su ID
const obtenerdonacion = async (req, res) => {
  const donacionId = req.params.id;
  try {
    const donacion = await Donacion.findByPk(donacionId);
    if (!donacion) {
      return res.status(404).json({ error: "Donacion no encontrada" });
    }
    res.json(donacion);
  } catch (error) {
    console.error("Error al obtener la donacion:", error);
    res.status(500).json({ error: "Error al obtener la donacion" });
  }
};

// Controlador para actualizar una donacion por su ID
const actualizardonacion = async (req, res) => {
  const donacionId = req.params.id;
  const Nombre_donacion = req.body;
  try {
    const donacion = await Donacion.findByPk(donacionId);
    if (!donacion) {
      return res.status(404).json({ error: "Donacion no encontrada" });
    }
    
    await donacion.update(Nombre_donacion)
    
    res.json(donacion);
  } catch (error) {
    console.error("Error al actualizar la donacion:", error);
    res.status(500).json({ error: "Error al actualizar la donacion" });
  }
};

// Controlador para eliminar una donacion por su ID
const eliminardonacion = async (req, res) => {
  const donacionId = req.params.id;
  try {
    const donacion = await Donacion.findByPk(donacionId);
    if (!donacion) {
      return res.status(404).json({ error: "Donacion no encontrada" });
    }
    await donacion.destroy();
    res.json({ mensaje: "Donacion eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la donacion:", error);
    res.status(500).json({ error: "Error al eliminar la donacion" });
  }
};

module.exports = {
    listardonaciones,
    creardonacion,
    obtenerdonacion,
    actualizardonacion,
    eliminardonacion
}