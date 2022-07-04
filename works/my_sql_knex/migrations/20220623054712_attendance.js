
exports.up = function(knex) {
  return knex.schema.createTable('attendance', (table) => {
    table.increments('id').primary();
    table.integer('worker_id').notNullable();
    table.string('name').nullable();
    table.string('email').nullable();
    table.date('date').nullable();
    table.boolean('present').nullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('attendance');
};
