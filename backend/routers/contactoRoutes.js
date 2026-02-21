const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');
const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limita cada IP a 5 mensajes por ventana
    message: "Demasiados intentos, intentá más tarde."
});

// Rutas para el contacto
router.post('/contacto', contactLimiter, contactoController.sendMail);

module.exports = router;