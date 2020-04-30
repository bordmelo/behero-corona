
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('category').notNullable();
    table.decimal('value');
    table.integer('needer_id').notNullable();
    table.foreign('needer_id').references('id').inTable('needers');
  });
};

exports.down = function(knex) {
  knex.schema.dropTable('incidents');
};
