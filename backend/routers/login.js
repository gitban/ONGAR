const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rutas para loguearse al sistema/
router.post('/login', loginController.login);

module.exports = router;