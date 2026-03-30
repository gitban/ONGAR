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
  try {

    const datos = req.body;
    const archivo = req.file; // 

    // Verificamos si llegó imagen
    if (archivo) {
      datos.imagen = `/imagenes/${archivo.filename}`;
    }

    const nuevaNoticia = await Noticia.create(datos);
    
    res.status(201).json(nuevaNoticia);
    
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
const { id } = req.params;
  
  // Si multer está configurado con .single('foto'), el archivo estará en req.file
  const archivoNuevo = req.file; 
  const fotoVieja = req.body.fotoExistente;

  try {
    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }

    // LÓGICA DE LA FOTO:
    // 1. Si hay un archivo nuevo, usamos esa ruta.
    // 2. Si no hay archivo nuevo, usamos la foto que ya tenía (enviada desde el front).
    // 3. Si no hay ninguna de las dos, podrías dejarla vacía o mantener la de la DB.
    let fotoFinal = noticia.foto; // Valor por defecto: lo que ya hay en la DB

    if (archivoNuevo) {
      fotoFinal = `/imagenes/${archivoNuevo.filename}`;
      
      // OPCIONAL: Borrar el archivo físico de la foto vieja del servidor para no acumular basura
      // if (noticia.foto) { fs.unlinkSync(path.join(__dirname, '../../public', noticia.foto)); }
    } else if (fotoVieja) {
      fotoFinal = fotoVieja;
    }
console.log(fotoFinal)
    // Actualizamos el objeto con los datos de req.body y la foto elegida
    await noticia.update({
      ...req.body,
      imagen: fotoFinal
    });

    res.json({ message: "Noticia actualizada", noticia });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar" });
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