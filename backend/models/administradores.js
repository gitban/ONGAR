const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database/db");
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

const Administrador = sequelize.define(
  "administrador",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS,
      autoincrement: true,
      alowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      unique:true, 
      alowNull: false
    },
    password_hash: { 
      type: DataTypes.STRING(50), 
      alowNull: false
    },
    gestionar_contenido: { 
      type: DataTypes.BOOLEAN, 
      alowNull: false
    },
  },
  {
    tableName: 'administradores',
    timestamps: false,
  }
)

module.exports = Administrador
