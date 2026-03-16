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
  
  try {
    // Validar que el ID sea válido
    if (!id) {
      return res.status(400).json({ error: "ID de historia requerido" });
    }

    // Validar que la historia exista
    const historiaExistente = await Historia.findByPk(id);
    if (!historiaExistente) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }

    const datosActualizados = req.body;
    const archivos = req.files;

    // Procesar imágenes existentes
    let imagenesViejas = [];
    
    // Manejar imagenesExistentes - puede venir como JSON string desde FormData
    if (req.body.imagenesExistentes) {
      try {
        // Intentar parsear como JSON (si viene como string desde FormData)
        if (typeof req.body.imagenesExistentes === 'string') {
          const parsed = JSON.parse(req.body.imagenesExistentes);
          imagenesViejas = Array.isArray(parsed) ? parsed : [parsed];
        } else if (Array.isArray(req.body.imagenesExistentes)) {
          imagenesViejas = req.body.imagenesExistentes;
        } else if (typeof req.body.imagenesExistentes === 'string') {
          imagenesViejas = [req.body.imagenesExistentes];
        }
      } catch (parseError) {
        // Si no puede parsearse como JSON, tratar como string simple
        imagenesViejas = [req.body.imagenesExistentes];
      }
      
      // Filtrar imágenes vacías
      imagenesViejas = imagenesViejas.filter(img => img && String(img).trim() !== '');
    }

    // Procesar imágenes nuevas
    const imagenesNuevas = archivos && archivos.length > 0 
      ? archivos.map(f => `/imagenes/${f.filename}`) 
      : [];

    // Combinar imágenes: viejas + nuevas
    const totalImagenes = [...imagenesViejas, ...imagenesNuevas];

    // Actualizar datos
    datosActualizados.imagenes = totalImagenes.length > 0 ? totalImagenes : [];

    // Eliminar la propiedad imagenesExistentes del objeto a actualizar
    delete datosActualizados.imagenesExistentes;

    // Actualizar la historia
    const [rowsUpdated] = await Historia.update(datosActualizados, {
      where: { id: id },
    });

    if (rowsUpdated === 0) {
      return res.status(404).json({ message: "No se encontró la historia o no hay cambios" });
    }

    // Obtener la historia actualizada para devolver al cliente
    const historiaActualizada = await Historia.findByPk(id);
    
    res.json({ 
      message: "Historia actualizada con éxito",
      data: historiaActualizada 
    });
  } catch (error) {
    console.error("Error al actualizar historia:", error);
    res.status(500).json({ error: "Error interno del servidor", message: error.message });
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