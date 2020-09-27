const express = require('express');
const knex = require('knex');
const helmet = require("helmet");
const consign = require('consign');
const cors = require("cors");

//instancia o express
const app = express()

//conexão com o banco
app.db = knex(require('./database/knexfile.js'));

//caso falhar retorna um erro
app.db.raw('select 1+1 as result').catch(err => {
    console.log("Erro ao conectar ao banco de dados, configure em /database/knexfile.js");
    process.exit(1);
});

//executo as migrations
app.db.migrate.latest().catch(error =>  {
  console.error('Erro Migrations: '+error)
  process.exit(1);
})

//middleware de segurança nos headers
app.use(helmet());

//permissão cors para acesso a api
app.use(cors());

//tratamento do payload
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//carrega controllers e rotas
consign({cwd: 'src'})
.then('./controllers')
.then('./routes.js')
.into(app)

//inicia serviço
let porta = 3000;
app.listen(porta, () => {
  console.log(`Serviço executando na porta ${porta}...`);
});

module.exports = app;
