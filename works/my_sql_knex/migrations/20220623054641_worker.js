
exports.up = function(knex) {
  return knex.schema.createTable('worker', (table) => {
    table.increments('id').primary();
    table.string('name').nullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.integer('experience').nullable();
    table.boolean('status').defaultTo(true);
    table.boolean('delete').defaultTo(false);
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('worker');
};
