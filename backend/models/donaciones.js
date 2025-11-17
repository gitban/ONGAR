const { Model, DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require("../database/db");

const Donacion = sequelize.define(
  "donacion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
    donante_nombre: {
      type: DataTypes.STRING(150),
      alowNull: false 
    },
    monto: { 
      type: DataTypes.FLOAT,
      alowNull: false 
    },
    fecha: {
       type: DataTypes.TIME,
       alowNull: false, 
    },
    referencia_pago: {
      type: DataTypes.STRING(255)
    },
  },
  {
    tableName: 'donaciones',
    timestamps: false,
  }
)

module.exports = Donacion
