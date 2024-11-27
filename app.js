const express = require('express')
const sequelize = require('./config/db')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')

const alunosRoutes = require('./routes/alunosRoutes')
const professoresRoutes = require('./routes/professoresRoutes')
const eventosRoutes = require('./routes/eventosRoutes')
const agendamentosRoutes = require('./routes/agendamentosRoutes')
const profissionaisRoutes = require('./routes/profissionaisRoutes')
const usuariosRoutes = require ('./routes/usuariosRoutes')

const app = express()
app.use(express.json())

// Rotas
app.use('/api/alunos', alunosRoutes)
app.use('/api/professores', professoresRoutes)
app.use('/api/eventos', eventosRoutes)
app.use('/api/agendamentos', agendamentosRoutes)
app.use('/api/profissionais', profissionaisRoutes)
app.use('/api/usuarios', usuariosRoutes)

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar o servidor
const PORT = process.env.PORT || 9090
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

//Teste de conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

// Sincronização dos modelos
// sequelize.sync({ force: false }) // force: false -> não recria as tabelas se já existem
//   .then(() => {
//     console.log('Modelos sincronizados com o banco de dados.');
//   })
//   .catch(err => {
//     console.error('Erro ao sincronizar os modelos:', err);
//   });
})