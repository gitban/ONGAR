const { Noticia, Post } = require('../database/associations');

// Controlador para listar todas las noticias
const listarnoticias = async (req, res) => {
  try {
    const noticias = await Noticia.findAll();
    res.json(noticias);
  } catch (error) {
    console.error("Error al listar las noticias:", error);
    res.status(500).json({ error: "Esteban, Error al listar los noticias" });
  }
};

// Controlador para crear una nueva noticia
const crearnoticia = async (req, res) => {
  const Nombre_noticia = req.body;
  console.log(Nombre_noticia);
  try {
    await Noticia.create(Nombre_noticia);
    res.status(201).json(Nombre_noticia);
  } catch (error) {
    console.error("Error al crear la noticia:", error);
    res.status(500).json({ error: "Error al crear la noticia" });
  }
};

// Controlador para obtener una noticia por su ID
const obtenernoticia = async (req, res) => {
  const noticiaId = req.params.id;
  try {
    const noticia = await Noticia.findByPk(noticiaId);
    if (!noticia) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }
    res.json(noticia);
  } catch (error) {
    console.error("Error al obtener la noticia:", error);
    res.status(500).json({ error: "Error al obtener la noticia" });
  }
};

// Controlador para actualizar una noticia por su ID
const actualizarnoticia = async (req, res) => {
  const noticiaId = req.params.id;
  const Nombre_noticia = req.body;
  try {
    const noticia = await Noticia.findByPk(noticiaId);
    if (!noticia) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }
    
    await noticia.update(Nombre_noticia)
    
    res.json(noticia);
  } catch (error) {
    console.error("Error al actualizar la noticia:", error);
    res.status(500).json({ error: "Error al actualizar la noticia" });
  }
};

// Controlador para eliminar una noticia por su ID
const eliminarnoticia = async (req, res) => {
  const noticiaId = req.params.id;
  try {
    const noticia = await Noticia.findByPk(noticiaId);
    if (!noticia) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }
    await noticia.destroy();
    res.json({ mensaje: "Noticia eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la noticia:", error);
    res.status(500).json({ error: "Error al eliminar la noticia" });
  }
};

module.exports = {
    listarnoticias,
    crearnoticia,
    obtenernoticia,
    actualizarnoticia,
    eliminarnoticia
}