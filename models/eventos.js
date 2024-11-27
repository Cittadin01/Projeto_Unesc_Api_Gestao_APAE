const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Evento = sequelize.define('Evento', {
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  descricao: {
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
}, {
  tableName: 'eventos',
  timestamps: false,
});

module.exports = Evento;
