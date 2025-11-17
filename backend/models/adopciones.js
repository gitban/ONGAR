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
    solicitante_id:{
      type: DataTypes.INTEGER
    },
    nombre_solicitante: {
      type: DataTypes.STRING(150),
      alowNull: false 
    },
    contacto: { 
      type: DataTypes.STRING(150),
      alowNull: false 
    },
    experiencia_mascotas: {
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
