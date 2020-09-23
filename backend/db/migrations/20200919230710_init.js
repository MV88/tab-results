const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  email,
  references,
} = require('../../src/lib/tableUtils');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.map_type, (table) => {
    table.increments().notNullable();
    table.string('type').notNullable();
    table.string('description');
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    email(table, 'email').notNullable().unique();
    table.string('name').notNullable();
    table.string('token ').notNullable();
    table.string('password_digest').notNullable();
    table.datetime('last_login');
    addDefaultColumns(table);
  });
  await knex.schema.createTable(tableNames.result, (table) => {
    table.increments().notNullable();
    table.string('type', 1);
    table.integer('population');
    table.integer('day');
    table.integer('score').notNullable();
    table.integer('hour');
    table.integer('col_infected');
    table.integer('difficulty');
    table.integer('sol_dead');
    references(table, 'user');
    references(table, 'map_type');
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await Promise.all([
    tableNames.result,
    tableNames.user,
    tableNames.map_type,
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
};