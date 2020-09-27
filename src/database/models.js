/**
 * Models para manipulação de objetos do banco de dados.
 * @module models
 */

module.exports = (knex) => {
  
  /**
   * Cria referencia do objeto do Bookshelf para criar os modelos.
   * @param {Objeto} knex Instancia do Knex
   */
  const bookshelf = require("bookshelf")(knex);

  /**
   * Cidade
   * @property  {String} tableName - cidades
   */
   const Cidade = bookshelf.Model.extend({
    tableName: "cidades",
  });

  /**
   * Cliente
   * @property  {String} tableName - clientes
   * @property  {Function} cidades - Associa a cidade ao respectivo cliente.
   */
  const Cliente = bookshelf.Model.extend({
    tableName: "clientes",
    cidades: function() {
      return this.hasOne(Cidade, 'id', 'cidade_id');
    }
  });

  

  return {
    Cidade,
    Cliente  
  }
};
