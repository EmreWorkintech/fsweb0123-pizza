/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('Roles', (table) => {
        table.increments('id')
        table.text('name')
            .unique()
            .notNullable()
    })
    .createTable('Users', (table) => {
        table.increments('id')
        table.text('email').unique().notNullable()
        table.text('password').notNullable()
        table.text('name').notNullable()
        table.text('surname').notNullable()
        table.bigInteger('role_id')
            .notNullable()
            .unsigned()
            .defaultTo(2)
            .references('id')
            .inTable('Roles')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Users')
                        .dropTableIfExists('Roles')
  
};
