const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const historiasController = require('../controllers/historiasController');

// Rutas para las historias
router.get('/historias', historiasController.listarhistorias);
router.post('/historias',verifyToken, historiasController.crearhistoria);
router.get('/historias/:id',verifyToken, historiasController.obtenerhistoria);
router.put('/historias/:id',verifyToken, historiasController.actualizarhistoria);
router.delete('/historias/:id',verifyToken, historiasController.eliminarhistoria);

module.exports = router;