const { Model, DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require("../database/db");

const Adopcion = sequelize.define(
  "adopcion",
  {
    id_adopcion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
     id_animal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre_apellido: {
      type: DataTypes.STRING(150),
      allowNull: false 
    },
    email: { 
      type: DataTypes.STRING(150),
      allowNull: false 
    },
    direccion: { 
      type: DataTypes.STRING(150),
      allowNull: false 
    },
    telefono: { 
      type: DataTypes.BIGINT,
      allowNull: false 
    },
    mensaje: {
       type: DataTypes.TEXT,
       allowNull: false, 
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fecha_envio: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  },
  {
    tableName: 'solicitudes_adopcion',
    timestamps: false,
  }
)

module.exports = Adopcion
