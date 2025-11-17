const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const usuariosController = require('../controllers/usuariosController');

// Rutas para los Usuarios
router.get('/admin',verifyToken, usuariosController.listarusuarios);
router.get('/admin/:id', verifyToken, usuariosController.obtenerusuario);
router.put('/admin/:id', verifyToken, usuariosController.actualizarusuario);
router.delete('/admin/:id', verifyToken, usuariosController.eliminarusuario);

module.exports = router;