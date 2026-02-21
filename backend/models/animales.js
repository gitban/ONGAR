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
      alowNull: false,
      get() {
        const rawValue = this.getDataValue('foto');
        // Si hay datos, los convertimos de String a Array, si no, devolvemos array vacío
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(val) {
        // Al guardar, convertimos el Array a String automáticamente
        this.setDataValue('foto', JSON.stringify(val));
      }
    },
    fecha_ingreso: {
      type: DataTypes.TIME,
      alowNull: false
    },
    adoptado: {
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
