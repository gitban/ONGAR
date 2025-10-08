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
    id_perro:{type: DataTypes.INTEGER},
    nombre: { type: DataTypes.STRING(150), alowNull: false },
    apellido: { type: DataTypes.STRING(100), alowNull: false },
    email: { type: DataTypes.STRING(100), alowNull: false, 
      unique: { args: true, msg:"El email ya existe!!"} ,
      validate: {
        isEmail: true // Valida que el email tiene un formato válido
       }},
    telefono: { type: DataTypes.STRING(11)},
    direccion_calle: { type: DataTypes.STRING(100), alowNull: false },
    direccion_nro: { type: DataTypes.INTEGER, alowNull: false },
    direccion_ciudad: { type: DataTypes.STRING(50), alowNull: false },
    direccion_provincia: { type: DataTypes.STRING(50), alowNull: false },
  },
  {
    tableName: 'adopciones',
    timestamps: false,
  }
)

module.exports = Adopcion
