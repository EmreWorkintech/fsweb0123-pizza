/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Toppings', (table) => {
            table.increments('id')
            table.text('name')
                .notNullable()
        }).createTable('Order_Toppings', (table) => {
            table.integer('order_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('Orders')
                .onDelete('CASCADE')
                .onDelete('CASCADE')
            table.integer('topping_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('Toppings')
                .onDelete('RESTRICT')
                .onDelete('RESTRICT')
            table.primary(['order_id','topping_id'])
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Order_Toppings')
                     .dropTableIfExists('Toppings')
};
