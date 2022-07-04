/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').primary();
        table.string('name').nullable();
        table.string('password').notNullable().unique();
        table.string('age').nullable();
        table.string('sex').nullable();
        table.string('address').nullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) { 
    return knex.schema.dropTable('user');
};