import type Knex from "knex";

export async function up(knex: ReturnType<typeof Knex>) {
  return knex.schema.createTable('items', table =>  {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
    
  });
}

export async function down(knex: ReturnType<typeof Knex>) {
  return knex.schema.dropTable('items');
}
