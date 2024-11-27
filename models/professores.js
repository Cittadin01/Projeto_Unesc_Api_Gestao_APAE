const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Professor = sequelize.define('Professor', {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disciplina: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'),
    allowNull: false,
    defaultValue: 'ativo',
  },
}, {
  tableName: 'professores',  // Nome da tabela no banco de dados
  timestamps: false,        // Desativa timestamps automáticos
});

module.exports = Professor;
