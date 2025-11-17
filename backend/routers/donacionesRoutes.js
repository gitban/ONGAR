const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const donacionesController = require('../controllers/donacionesController');

// Rutas para las donaciones
router.get('/donaciones',verifyToken, donacionesController.listardonaciones);
router.post('/donaciones',verifyToken, donacionesController.creardonacion);
router.get('/donaciones/:id',verifyToken, donacionesController.obtenerdonacion);
router.put('/donaciones/:id',verifyToken, donacionesController.actualizardonacion);
router.delete('/donaciones/:id',verifyToken, donacionesController.eliminardonacion);

module.exports = router;