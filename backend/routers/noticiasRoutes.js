const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const noticiasController = require('../controllers/noticiasController');
const upload = require('../lib/multerConfig');


// Rutas para las noticias
router.get('/noticias', noticiasController.listarnoticias);
router.post('/noticias',verifyToken,upload.single('foto'), noticiasController.crearnoticia);
router.get('/noticias/:id',verifyToken, noticiasController.obtenernoticia);
router.put('/noticias/:id',verifyToken, noticiasController.actualizarnoticia);
router.delete('/noticias/:id',verifyToken, noticiasController.eliminarnoticia);

module.exports = router;