const { Model, DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require("../database/db");

const Historia = sequelize.define(
  "historia",
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
    imagenes: {
       type: DataTypes.JSON,
       alowNull: false, 
    },
    fecha_publicacion: {
      type: DataTypes.TIME
    },
  },
  {
    tableName: 'historias',
    timestamps: false,
  }
)

module.exports = Historia
