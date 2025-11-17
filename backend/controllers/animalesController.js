const { Animal, Post } = require('../database/associations');

// Controlador para listar todas las animales
const listaranimales = async (req, res) => {
  try {
    const animales = await Animal.findAll();
    res.json(animales);
  } catch (error) {
    console.error("Error al listar las animales:", error);
    res.status(500).json({ error: "Error al listar los animales" });
  }
};

// Controlador para crear una nueva animal
const crearanimal = async (req, res) => {
  const Nombre_animal = req.body;
  console.log(Nombre_animal);
  try {
    await Animal.create(Nombre_animal);
    res.status(201).json(Nombre_animal);
  } catch (error) {
    console.error("Error al crear la animal:", error);
    res.status(500).json({ error: "Error al crear la animal" });
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
  const animalId = req.params.id;
  const Nombre_animal = req.body;
  try {
    const animal = await Animal.findByPk(animalId);
    if (!animal) {
      return res.status(404).json({ error: "Animal no encontrada" });
    }
    
    await animal.update(Nombre_animal)
    
    res.json(animal);
  } catch (error) {
    console.error("Error al actualizar la animal:", error);
    res.status(500).json({ error: "Error al actualizar la animal" });
  }
};

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
    eliminaranimal
}