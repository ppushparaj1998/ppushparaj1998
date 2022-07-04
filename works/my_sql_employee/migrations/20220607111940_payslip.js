/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('payslips', (table) => {
        table.increments('id').primary();
        table.string('emp_name').nullable();
        table.integer('emp_id').notNullable().unique();
        table.string('role').nullable();
        table.integer('salary_amount').nullable();
        table.timestamps(true, true);
    });
  };
  
  
  exports.down = function(knex) {
      return knex.schema.dropTable('payslips');
  };
