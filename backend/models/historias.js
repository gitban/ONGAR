const { Model, DataTypes, UniqueConstraintError } = require('sequelize');
const sequelize = require("../database/db");

const Historia = sequelize.define(
  "historia",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoincrement: true,
      alowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(255),
      alowNull: false 
    },
    contenido: { 
      type: DataTypes.TEXT,
      alowNull: false 
    },
    imagenes: {
       type: DataTypes.JSON,
       alowNull: true,
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
      type: DataTypes.TIME
    },
  },
  {
    tableName: 'historias',
    timestamps: false,
  }
)

module.exports = Historia
