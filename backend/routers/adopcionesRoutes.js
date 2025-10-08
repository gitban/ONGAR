const express = require('express');
const router = express.Router();
const adopcionesController = require('../controllers/adopcionesController');

// Rutas para las categorías
router.get('/adopciones', adopcionesController.listaradopciones);
router.post('/adopciones', adopcionesController.crearadopcion);
router.get('/adopciones/:id', adopcionesController.obteneradopcion);
router.put('/adopciones/:id', adopcionesController.actualizaradopcion);
router.delete('/adopciones/:id', adopcionesController.eliminaradopcion);

module.exports = router;