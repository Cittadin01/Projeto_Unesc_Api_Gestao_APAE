const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Agendamento = sequelize.define('Agendamento', {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  aluno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profissional: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'agendamentos',
  timestamps: false,
});

module.exports = Agendamento;
