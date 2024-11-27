const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Usuario = sequelize.define('Usuario', {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pwd: {
    type: DataTypes.STRING,
  },
  nivel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  }, {
    tableName: 'usuarios', // Nome da tabela no banco de dados
    timestamps: false,
});

module.exports = Usuario;
