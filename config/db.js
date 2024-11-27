const { Sequelize } = require('sequelize');

// Configuração do banco de dados
const sequelize = new Sequelize('TrabalhoInterdisciplinar', 'Vinicius', 'vini2728', {
  host: 'localhost',
  dialect: 'postgres', // Especifica o PostgreSQL como o banco de dados
  logging: false, // Desative os logs do SQL (opcional)
});

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = sequelize;
