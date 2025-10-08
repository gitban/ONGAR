const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database/db");

const Miembro = sequelize.define(
  "miembro",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
    nombre: { type: DataTypes.STRING(100), alowNull: false },
    apellido: { type: DataTypes.STRING(50), alowNull: false },
    email: { type: DataTypes.STRING(150) },
  },
  {
    tableName: 'miembros',
    timestamps: false,
  }
)

module.exports = Miembro
