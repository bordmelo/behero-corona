
exports.up = function(knex) {
  return knex.schema.createTable('needers', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('state', 2).notNullable();
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('needers');
};
