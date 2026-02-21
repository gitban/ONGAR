const { Animal } = require("../database/associations");
const { Adopcion } = require('../database/associations');

// Controlador para listar todos los animales en adopcion
const listaranimales = async (req, res) => {
  try {
    const animales = await Animal.findAll({ where: { adoptado: 0 } });
    if (!animales || animales.length === 0) {
      return res.status(200).json([]); // Devolvemos array vacío si no hay nada
    }
    res.json(animales);
  } catch (error) {
    console.error("Error al listar las animales:", error);
    res.status(500).json({ error: "Error al listar los animales" });
  }
};

// Controlador para crear un nuevo animal

const crearanimal = async (req, res) => {
  try {
    const datosAnimal = req.body;
    const archivos = req.files;

    if (archivos && archivos.length > 0) {
      // Solo creamos el array de strings, el MODELO se encarga del JSON.stringify
      datosAnimal.foto = archivos.map((file) => `/imagenes/${file.filename}`);
    }

    const nuevoAnimal = await Animal.create(datosAnimal);

    res.status(201).json({
      success: true,
      data: nuevoAnimal, // 'nuevoAnimal.foto' ya será un Array aquí por el getter
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener una animal por su ID
const obteneranimal = async (req, res) => {
  const animalId = req.params.id;
  try {
    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      return res.status(404).json({ error: "Animal no encontrado" });
    }
    res.json(animal);
  } catch (error) {
    console.error("Error al obtener el animal:", error);
    res.status(500).json({ error: "Error al obtener el animal" });
  }
};

// Controlador para actualizar una animal por su ID
const actualizaranimal = async (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  const archivos = req.files;

  const fotosViejas = req.body.fotosExistentes
    ? (Array.isArray(req.body.fotosExistentes) ? req.body.fotosExistentes : [req.body.fotosExistentes])
    : [];

  const fotosNuevas = req.files.map(f => `/imagenes/${f.filename}`);

  // El resultado final es la suma de ambos
  const totalFotos = [...fotosViejas, ...fotosNuevas];

  datosActualizados.foto = totalFotos

  try {
    // IMPORTANTE: El segundo argumento es { where: { id: id } }
    const [rowsUpdated] = await Animal.update(datosActualizados, {
      where: { id: id },
    });

    if (rowsUpdated === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró el animal o no hay cambios" });
    }

    res.json({ message: "Actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

//Actualizar el estado del animal

const actualizarestado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // El nuevo estado que viene del frontend
    const { datosadicionales } = req.body; // El nuevo estado que viene del frontend

    // Validamos que venga un estado
    if (!estado) return res.status(400).json({ mensaje: "El estado es requerido" });

    const [actualizado] = await Animal.update(
      { adoptado: estado }, // Solo tocamos esta columna
      { where: { id: id } }
    );
    const [solicitudAceptada] = await Adopcion.update(
      { estado: 1, observaciones: datosadicionales }, // Modificamos la columna observaciones
      { where: { id_adopcion: estado } }
    );
    if (actualizado === 0 && solicitudAceptada) {
      return res.status(404).json({ mensaje: "Animal no encontrado" });
    }

    res.json({ mensaje: "Estado actualizado con éxito", nuevoEstado: estado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controlador para eliminar una animal por su ID
const eliminaranimal = async (req, res) => {
  const animalId = req.params.id;
  try {
    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      return res.status(404).json({ error: "Animal no encontrada" });
    }
    await animal.destroy();
    res.json({ mensaje: "Animal eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la animal:", error);
    res.status(500).json({ error: "Error al eliminar la animal" });
  }
};

module.exports = {
  listaranimales,
  crearanimal,
  obteneranimal,
  actualizaranimal,
  actualizarestado,
  eliminaranimal,
};
