/**
 * @module cidades
 */
module.exports = app => {

    /**
     * Função para criar Cidades.
     * @function post
     * @param {Object} req Request
     * @param {json} req.body Campos a serem preenchidos da Cidades.
     * @param {Object} res Response
     * @returns {json} Status ou Mensagem de erro.
     */
    const post = (req, res) => {
      if (req.body) {
        if (!req.body.nome || req.body.nome === "") {
          res.status(400).send("É necessário informar o nome da Cidade!");
        } else if (!req.body.estado || req.body.estado === "") {
          res.status(400).send("É necessário informar o estado!");
        } else {
          app.db("cidades")
            .insert([req.body])
            .then(cidade => res.json(cidade))
            .catch(err => res.status(500).json(err.sqlMessage));
        }
      } else {
        res.status(204).send("É necessário enviar os dados da cidade para inserção!");
      }
    };

    /**
     * Função para buscar Cidades.
     * @function get
     * @param {Object} req Request
     * @param {Object} [req.params]
     * @param {int} [req.params.id] ID da cidade.
     * @param {Object} [req.query] 
     * @param {int} [req.query.nome] Parâmetro para filtrar o nome da cidade.
     * @param {int} [req.query.estado] Parâmetro para filtrar o estado da cidade.
     * @param {int} [req.query.page] Página à ser retornada.
     * @param {int} [req.query.pageSize] Tamanho das páginas.
     * @param {Object} res Response
     * @returns {json} Objeto com as Cidades.
     */
    const get = (req, res) => {
        const models = require("../database/models");
        const Cidade = models(app.db).Cidade;  
  
        Cidade.query(function(db) {
          if (req.params.id && req.params.id > 0) db.where("id", req.params.id);  
          if (req.query.nome && req.query.nome !== "") db.where('nome', 'like', `%${req.query.nome}%`)
          if (req.query.estado && req.query.estado !== "") db.where('estado', req.query.estado)
        })
        .fetchPage({
          withRelated: [],
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
     * Função para deletar Cidades.
     * @function del
     * @param {Object} req Request
     * @param {Object} req.params
     * @param {int} req.params.id ID da Cidade.
     * @param {Object} res Response
     * @returns {json} Status ou Mensagem de erro
     */
    const del = (req, res) => {
      if (req.params.id && req.params.id > 0) {
        app.db("cidades")
          .where("id", req.params.id)
          .del()
          .then(cidade => res.json(cidade))
          .catch(err => res.status(500).json(err.sqlMessage));
      } else {
        res.status(400).json("É necessário informar o id da cidade a ser deletada!");
      }
    };
  
    /**
     * Função para atualizar Cidades.
     * @function update
     * @param {Object} req Request
     * @param {Object} req.params
     * @param {int} req.params.id ID da Cidade.
     * @param {Object} req.body Campos a serem atualizados da Cidade.
     * @param {Object} res Response
     * @returns {json}  Status ou Mensagem de erro
     */
    const update = (req, res) => {
      if (req.params.id && req.params.id > 0) {
        app.db("cidades")
          .where("id", req.params.id)
          .update(req.body)
          .then(cidade => res.json(cidade))
          .catch(err => res.status(500).json(err.sqlMessage));
      } else {
        res.status(400).json("É necessário informar o id do cidade a ser alterada!");
      }
    };
  
    return { get, post, del, update }
  };
  