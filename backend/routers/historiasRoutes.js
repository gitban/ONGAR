const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const historiasController = require('../controllers/historiasController');
const upload = require('../lib/multerConfig');

// Rutas para las historias
router.get('/historias', historiasController.listarhistorias);
router.post('/historias', verifyToken, upload.array('imagenes', 3), historiasController.crearhistoria);
router.get('/historias/:id', verifyToken, historiasController.obtenerhistoria);
router.put('/historias/:id', verifyToken, upload.array('imagenes', 3), historiasController.actualizarhistoria);
router.delete('/historias/:id', verifyToken, historiasController.eliminarhistoria);

module.exports = router;