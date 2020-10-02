const tableNames = require('../../src/constants/tableNames');
const {results, map_type} = require('../../src/constants/results');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Knex = require('knex');

/**
 * @param {Knex} knex 
 */
exports.seed = async (knex) => {
  // clear all tabled before initial seeding
  await Promise.all(Object
    .keys(tableNames)
    .map((name) => knex(name).del()));

  const password = crypto.randomBytes(15).toString('hex');
  const user = {
    name: "gg",
    email: "gg",
    role: "admin",
    password_digest: await bcrypt.hash(password, 12),
  };
  
  const [createdUser] = await knex(tableNames.user).insert([
    user,
  ]).returning("*");

  console.log("user created: ", {
    password,
  },
    createdUser,
  );
  console.log("createdUser: ", createdUser);
  
  const insertedMapTypes = await knex(tableNames.map_type).insert(map_type, '*');
  console.log("insertedMapTypes: ", insertedMapTypes);

  const insertedResults = await knex(tableNames.result)
    .insert(results.map((r => {
      return {
        ...r,
        map_type_id: insertedMapTypes[0].id,
        user_id: createdUser.id,
      };
    })), '*');
  console.log("insertedResults[0]: ", insertedResults[0]);

};
