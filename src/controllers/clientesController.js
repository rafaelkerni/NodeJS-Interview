/**
 * @module clientes
 */
module.exports = app => {

    /**
     * Função para criar Clientes.
     * @function post
     * @param {Object} req Request
     * @param {json} req.body Campos a serem preenchidos dos Clientes.
     * @param {Object} res Response
     * @returns {json} Status 204 ou Mensagem de erro.
     */
    const post = (req, res) => {
      if (req.body) {
        if (!req.body.nome || req.body.nome === "") {
          res.status(400).send("É necessário informar o nome do Cliente!");
        } else if (!req.body.sexo || req.body.sexo === "") {
          res.status(400).send("É necessário informar o sexo do Cliente!");
        } else if (!req.body.datanascimento || req.body.datanascimento === "") {
          res.status(400).send("É necessário informar a data de nascimento do Cliente!");
        } else if (!req.body.idade || req.body.idade <= 0) {
          res.status(400).send("É necessário informar a idade do Cliente!");
        } else if (!req.body.cidade_id || req.body.cidade_id <= 0) {
          res.status(400).send("É necessário informar a cidade do Cliente!");
        } else {
          app.db("clientes")
            .insert([req.body])
            .then(cidade => res.json(cidade))
            .catch(err => res.status(500).json(err.sqlMessage));
        }
      } else {
        res.status(204).send("É necessário enviar os dados do cliente para inserção!");
      }
    };

    /**
     * Função para buscar Clientes.
     * @function get
     * @param {Object} req Request
     * @param {Object} [req.params]
     * @param {int} [req.params.id] ID do cliente.
     * @param {Object} [req.query] 
     * @param {int} [req.query.nome] Parâmetro para filtrar o nome do cliente.
     * @param {int} [req.query.cidade_id] Parâmetro para filtrar a cidade do cliente.
     * @param {string} [req.query.relations] Parâmetro para trazer as relações do cliente.
     * @param {int} [req.query.page] Página à ser retornada.
     * @param {int} [req.query.pageSize] Tamanho das páginas.
     * @param {Object} res Response
     * @returns {json} Objeto com os Clientes.
     */
    const get = (req, res) => {
        const models = require("../database/models");
        const Cliente = models(app.db).Cliente;  
  
        Cliente.query(function(db) {
          if (req.params.id && req.params.id > 0) db.where("id", req.params.id);  
          if (req.query.nome && req.query.nome !== "") db.where('nome', 'like', `%${req.query.nome}%`)
          if (req.query.cidade_id && req.query.cidade_id !== "") db.where('cidade_id', req.query.cidade_id)
        })
        .fetchPage({
          withRelated: [req.query.relations],
          page: req.params.page || 1,
          pageSize: !req.query.pagesize || req.query.pagesize > 20 ? 20 : req.query.pagesize
        })
        .then(function({ models, pagination } = data) {
          res.json({ data: models, pagination });
        })
        .catch(function(err) {
          console.error(err);
        });
    }
  
    /**
     * Função para deletar Clientes.
     * @function del
     * @param {Object} req Request
     * @param {Object} req.params
     * @param {int} req.params.id ID do Cliente.
     * @param {Object} res Response
     * @returns {json} Status 204 ou Mensagem de erro
     */
    const del = (req, res) => {
      if (req.params.id && req.params.id > 0) {
        app.db("clientes")
          .where("id", req.params.id)
          .del()
          .then(cidade => res.json(cidade))
          .catch(err => res.status(500).json(err.sqlMessage));
      } else {
        res.status(400).json("É necessário informar o id do cliente a ser deletado!");
      }
    };
  
    /**
     * Função para atualizar Clientes.
     * @function update
     * @param {Object} req Request
     * @param {Object} req.params
     * @param {int} req.params.id ID da Cliente.
     * @param {Object} req.body Campos a serem atualizados do Cliente.
     * @param {Object} res Response
     * @returns {json}  ou Mensagem de erro
     */
    const update = (req, res) => {
      if (req.params.id && req.params.id > 0) {
        app.db("clientes")
          .where("id", req.params.id)
          .update(req.body)
          .then(cidade => res.json(cidade))
          .catch(err => res.status(500).json(err.sqlMessage));
      } else {
        res.status(400).json("É necessário informar o id do cliente a ser alterado!");
      }
    };
  
    return { get, post, del, update }
  };
  