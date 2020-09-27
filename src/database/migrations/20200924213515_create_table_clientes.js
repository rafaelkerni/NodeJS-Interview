
exports.up = function(knex, Promise) {
    return knex.schema.createTable('clientes', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('sexo').notNull()
        table.date('datanascimento').notNull()
        table.integer('idade').notNull()
        table.integer('cidade_id').unsigned().references('id').inTable('cidades').onDelete('SET NULL');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('clientes')
};
