const { Historia } = require('../database/associations');

// Controlador para listar todas las historias
const listarhistorias = async (req, res) => {
  try {
    const historias = await Historia.findAll();
    res.json(historias);
  } catch (error) {
    console.error("Error al listar las historias:", error);
    res.status(500).json({ error: "Error al listar las historias" });
  }
};

// Controlador para crear una nueva historia
const crearhistoria = async (req, res) => {
  try {
    const datosHistoria = req.body;
    const archivos = req.files;

    // Validar campos requeridos
    if (!datosHistoria.titulo || !datosHistoria.contenido) {
      return res.status(400).json({ error: "El título y contenido son requeridos" });
    }

    // Inicializar array de imágenes
    if (archivos && archivos.length > 0) {
      // Solo creamos el array de strings, el MODELO se encarga del JSON.stringify
      datosHistoria.imagenes = archivos.map((file) => `/imagenes/${file.filename}`);
    } else {
      // Si no hay archivos, inicializar como array vacío
      datosHistoria.imagenes = [];
    }

    // Establecer fecha de publicación si no viene
    if (!datosHistoria.fecha_publicacion) {
      datosHistoria.fecha_publicacion = new Date();
    }
    const nuevaHistoria = await Historia.create(datosHistoria);

    res.status(201).json({
      success: true,
      data: nuevaHistoria,
    });
  } catch (error) {
    console.error("Error al crear historia:", error);
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener una historia por su ID
const obtenerhistoria = async (req, res) => {
  const historiaId = req.params.id;
  
  try {
    if (!historiaId) {
      return res.status(400).json({ error: "ID de historia requerido" });
    }

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
  const fotosViejas = req.body.fotosExistentes
    ? (Array.isArray(req.body.fotosExistentes) ? req.body.fotosExistentes : [req.body.fotosExistentes])
    : [];

  const fotosNuevas = archivos.map(f => `/imagenes/${f.filename}`);

  // El resultado final es la suma de ambos
  const totalFotos = [...fotosViejas, ...fotosNuevas];

  datosActualizados.imagenes = totalFotos

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
    if (!historiaId) {
      return res.status(400).json({ error: "ID de historia requerido" });
    }

    const historia = await Historia.findByPk(historiaId);
    if (!historia) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }
    
    await historia.destroy();
    res.json({ 
      message: "Historia eliminada con éxito",
      data: historia 
    });
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