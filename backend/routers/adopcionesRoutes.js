const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const adopcionesController = require('../controllers/adopcionesController');

// Rutas para las adopciones
router.get('/adopciones',verifyToken, adopcionesController.listaradopciones);
router.post('/adopciones',verifyToken, adopcionesController.crearadopcion);
router.get('/adopciones/:id',verifyToken, adopcionesController.obteneradopcion);
router.put('/adopciones/:id',verifyToken, adopcionesController.actualizaradopcion);
router.delete('/adopciones/:id',verifyToken, adopcionesController.eliminaradopcion);

module.exports = router;