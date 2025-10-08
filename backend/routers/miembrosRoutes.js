const express = require('express');
const router = express.Router();
const miembrosController = require('../controllers/miembrosController');

// Rutas para las categorías
router.get('/admin', miembrosController.listarmiembros);
router.post('/admin', miembrosController.crearmiembro);
router.get('/admin/:id', miembrosController.obtenermiembro);
router.put('/admin/:id', miembrosController.actualizarmiembro);
router.delete('/admin/:id', miembrosController.eliminarmiembro);

module.exports = router;