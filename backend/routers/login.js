const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rutas para las categorías
router.post('/login', loginController.login);

module.exports = router;