const { Adopcion, Post } = require('../database/associations');

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