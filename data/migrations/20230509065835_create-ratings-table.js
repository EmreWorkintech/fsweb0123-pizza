/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Ratings', (table) => {
    table.integer('rate')
        .notNullable()
        .unsigned()
    table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('Users')
        .onDelete('CASCADE')
        .onDelete('CASCADE')
    table.integer('pizza_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('Pizzas')
        .onDelete('CASCADE')
        .onDelete('CASCADE')
    table.primary(['user_id', 'pizza_id'])
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Ratings')
};
