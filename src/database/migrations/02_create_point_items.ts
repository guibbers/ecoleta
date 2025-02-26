import type Knex from "knex";

export async function up(knex: ReturnType<typeof Knex>) {
  return knex.schema.createTable('point_items', table =>  {
    table.increments('id').primary();


    table.integer('point_id').notNullable().references('id').inTable('points');
    table.integer('item_id').notNullable().references('id').inTable('items');
    
  });
}

export async function down(knex: ReturnType<typeof Knex>) {
  return knex.schema.dropTable('point_items');
}
