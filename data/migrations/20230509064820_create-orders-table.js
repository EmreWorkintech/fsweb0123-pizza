/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Pizzas', (table) => {
        table.increments('id')
        table.text('name')
            .unique()
            .notNullable()
        table.text('description')
            .notNullable()
        table.decimal('price')
            .notNullable()
    }).createTable('Orders', (table) => {
        table.increments('id')
        table.text('size')
                .notNullable()
        table.text('dough')
                .notNullable()
        table.text('note')
        table.bigInteger('count')
            .notNullable()
            .unsigned()
        table.decimal('total_price')
            .notNullable()
        table.bigInteger('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Users')
            .onDelete('CASCADE')
            .onDelete('CASCADE')
        table.bigInteger('pizza_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Pizzas')
            .onDelete('RESTRICT')
            .onDelete('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Orders')
                        .dropTableIfExists('Pizzas')
  
};
