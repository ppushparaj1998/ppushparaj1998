exports.up = function(knex) {
  return knex.schema.createTable('employee_data', (table) => {
      table.increments('id').primary();
      table.string('name').nullable();
      table.string('password').notNullable().unique();
      table.string('Role').nullable();
      table.integer('Experience').nullable();
      table.timestamps(true, true);
  });
};


exports.down = function(knex) {
    return knex.schema.dropTable('employee_data');
};
