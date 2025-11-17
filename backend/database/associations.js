const Usuario = require('../models/usuarios');
const Animal = require('../models/animales');
const Adopcion = require('../models/adopciones');
const Donacion = require('../models/donaciones');
const Noticia = require('../models/noticias');
const Historia = require('../models/historias');
const User = require('../models/login');
const Administrador = require('../models/administradores');

module.exports = {
    User,
    Administrador,
    Usuario,
    Animal,
    Adopcion,
    Donacion,
    Noticia,
    Historia
};