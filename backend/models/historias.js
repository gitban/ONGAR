const { Model, DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require("../database/db");

const Historia = sequelize.define(
  "historia",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false 
    },
    contenido: { 
      type: DataTypes.TEXT,
      allowNull: false 
    },
    imagenes: {
       type: DataTypes.JSON,
       allowNull: true,
       get() {
         const rawValue = this.getDataValue('imagenes');
         // Si hay datos, los convertimos de String a Array, si no, devolvemos array vacío
         return rawValue ? JSON.parse(rawValue) : [];
       },
       set(val) {
         // Al guardar, convertimos el Array a String automáticamente
         this.setDataValue('imagenes', JSON.stringify(val));
       }
    },
    fecha_publicacion: {
      type: DataTypes.DATETIME,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
  },
  {
    tableName: 'historias',
    timestamps: false,
  }
)

module.exports = Historia
