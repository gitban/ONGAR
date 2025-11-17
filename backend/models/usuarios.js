const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database/db");

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(150), 
      alowNull: false
    },
    email: { 
      type: String(150), 
      alowNull: false, 
      unique: true 
    },
    telefono: { 
      type: String(50), 
      alowNull: false
    },
  },
  {
    tableName: 'usuarios',
    timestamps: false,
  }
)

module.exports = Usuario
