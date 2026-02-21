const { Model, DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require("../database/db");

const Adopcion = sequelize.define(
  "adopcion",
  {
    id_adopcion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
     id_animal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
    nombre_apellido: {
      type: DataTypes.STRING(150),
      alowNull: false 
    },
    email: { 
      type: DataTypes.STRING(150),
      alowNull: false 
    },
    direccion: { 
      type: DataTypes.STRING(150),
      alowNull: false 
    },
    telefono: { 
      type: DataTypes.BIGINT,
      alowNull: false 
    },
    mensaje: {
       type: DataTypes.TEXT,
       alowNull: false, 
    },
    estado: {
      type: DataTypes.STRING(20)
    },
    fecha_envio: { 
      type: DataTypes.TIME,
      alowNull: false 
    },
    observaciones: {
      type: DataTypes.TEXT,
      alowNull: false 
    },
  },
  {
    tableName: 'solicitudes_adopcion',
    timestamps: false,
  }
)

module.exports = Adopcion
