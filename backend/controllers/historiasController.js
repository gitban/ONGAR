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
  try {
    const datosHistoria = req.body;
    const archivos = req.files;

    if (archivos && archivos.length > 0) {
      // Solo creamos el array de strings, el MODELO se encarga del JSON.stringify
      datosHistoria.imagenes = archivos.map((file) => `/imagenes/${file.filename}`);
    }

    const nuevaHistoria = await Historia.create(datosHistoria);

    res.status(201).json({
      success: true,
      data: nuevaHistoria,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener una historia por su ID
const obtenerhistoria = async (req, res) => {
  const historiaId = req.params.id;
  try {
    const historia = await Historia.findByPk(historiaId);
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
  const { id } = req.params;
  const datosActualizados = req.body;
  const archivos = req.files;

  const imagenesViejas = req.body.imagenesExistentes
    ? (Array.isArray(req.body.imagenesExistentes) ? req.body.imagenesExistentes : [req.body.imagenesExistentes])
    : [];

  const imagenesNuevas = archivos ? archivos.map(f => `/imagenes/${f.filename}`) : [];

  // El resultado final es la suma de ambas
  const totalImagenes = [...imagenesViejas, ...imagenesNuevas];

  datosActualizados.imagenes = totalImagenes;

  try {
    // IMPORTANTE: El segundo argumento es { where: { id: id } }
    const [rowsUpdated] = await Historia.update(datosActualizados, {
      where: { id: id },
    });

    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró la historia o no hay cambios" });
    }

    res.json({ message: "Actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

// Controlador para eliminar una historia por su ID
const eliminarhistoria = async (req, res) => {
  const historiaId = req.params.id;
  try {
    const historia = await Historia.findByPk(historiaId);
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