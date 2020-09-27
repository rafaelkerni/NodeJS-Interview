
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cidades', table => {
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('estado').notNull()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cidades')
};
