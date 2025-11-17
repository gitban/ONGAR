const { Model, DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require("../database/db");

const Noticia = sequelize.define(
  "noticia",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(255),
      alowNull: false 
    },
    contenido: { 
      type: DataTypes.TEXT,
      alowNull: false 
    },
    imagen: {
       type: DataTypes.STRING(255),
       alowNull: false, 
    },
    fecha_publicacion: {
      type: DataTypes.TIME
    },
  },
  {
    tableName: 'noticias',
    timestamps: false,
  }
)

module.exports = Noticia
