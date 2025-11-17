const express = require('express');
const router = express.Router();
const verifyToken = require('../lib/VerificarToken')
const administradoresController = require('../controllers/administradoresController');

// Rutas para las administradores
router.get('/administradores',verifyToken, administradoresController.listaradministradores);
router.get('/administradores/:id',verifyToken, administradoresController.obteneradministrador);
router.put('/administradores/:id',verifyToken, administradoresController.actualizaradministrador);
router.delete('/administradores/:id',verifyToken, administradoresController.eliminaradministrador);

module.exports = router;