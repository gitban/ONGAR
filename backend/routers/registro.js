const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

// Ruta para el registro de un nuevo usuario
router.post('/registro', registroController.registro);

module.exports = router;