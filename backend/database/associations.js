const Miembro = require('../models/miembros');
const Adopcion = require('../models/adopciones');

// Configurar relaciones
// Categoria.hasMany(Contenido, { foreignKey: 'Categoria_ID' });
// Contenido.belongsTo(Categoria, { foreignKey: 'Categoria_ID' });

module.exports = {
    Miembro,
    Adopcion,
};