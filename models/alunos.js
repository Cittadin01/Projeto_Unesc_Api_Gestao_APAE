const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Aluno = sequelize.define('Aluno', {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  necessidades_especiais: {
    type: DataTypes.STRING,
    allowNull: false,
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
  tableName: 'alunos', // Nome da tabela no banco de dados
  timestamps: false, // Desativa timestamps automáticos
});

module.exports = Aluno;
