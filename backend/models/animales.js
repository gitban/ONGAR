const { Model, DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require("../database/db");
const { all } = require('../routers/registro');

const Adopcion = sequelize.define(
  "animal",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(50),
      alowNull: false 
    },
    sexo: { 
      type: DataTypes.STRING(20),
      alowNull: false 
    },
    edad_aproximada: {
       type: DataTypes.STRING(50),
       alowNull: false, 
    },
    tamaño: {
       type: DataTypes.STRING(50),
       alowNull: false, 
    },
    estado_salud: {
      type: DataTypes.STRING(255)
    },
    descripcion: {
      type: DataTypes.TEXT,
      alowNull: false 
    },
    foto: {
      type: DataTypes.STRING(255),
      alowNull: false 
    },
    fecha_ingreso: { 
      type: DataTypes.TIME,
      alowNull: false 
    },
    adoptado:{
      type: DataTypes.BOOLEAN,
      alowNull: false
    }
  },
  {
    tableName: 'animales',
    timestamps: false,
  }
)

module.exports = Adopcion
