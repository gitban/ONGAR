const { Model, DataTypes } = require('sequelize');
const sequelize = require("../database/db");

const User = sequelize.define('User', {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
{
    tableName: 'administradores',
    timestamps: false,
  }
)

module.exports = User


