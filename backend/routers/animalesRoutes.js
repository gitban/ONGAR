const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const animalesController = require('../controllers/animalesController');
const upload = require('../lib/multerConfig');

// Rutas para las animales
router.get('/animales', animalesController.listaranimales);
router.post('/animales', verifyToken, upload.array('foto', 3), animalesController.crearanimal);
router.get('/animales/:id',verifyToken, animalesController.obteneranimal);
router.patch('/animales/:id/estado',verifyToken, animalesController.actualizarestado);
router.put('/animales/:id', verifyToken,upload.array('foto', 3), animalesController.actualizaranimal);
router.delete('/animales/:id',verifyToken, animalesController.eliminaranimal);

module.exports = router;