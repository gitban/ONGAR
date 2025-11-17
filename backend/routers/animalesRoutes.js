const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const animalesController = require('../controllers/animalesController');

// Rutas para las animales
router.get('/animales',verifyToken, animalesController.listaranimales);
router.post('/animales',verifyToken, animalesController.crearanimal);
router.get('/animales/:id',verifyToken, animalesController.obteneranimal);
router.put('/animales/:id',verifyToken, animalesController.actualizaranimal);
router.delete('/animales/:id',verifyToken, animalesController.eliminaranimal);

module.exports = router;