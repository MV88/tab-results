const express = require('express');
require('dotenv').config();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const knex = require('knex')(configuration);

const app = require('./middlewares')(express());

const {
  signup,
  signout,
  findUser,
  authenticateJWT,
  signin,
  refreshToken,
} = require('./src/controllers/user');
const tableNames = require('./src/constants/tableNames');

// routes

app.get("/", (req, res) => {
  res.json({
    message: "TAB result API ",
  });
});

/**
 * this will fetch all the results from the user
 * @param {Knex} knex
 */
app.post("/results/byUser", authenticateJWT, async (req, res) => {
  const {email} = req.user;
    console.log("user is authenticated");
    const user = await findUser(email);
    const results = await knex
      .select("*")
      .from(tableNames.result)
      .where("user_id", user.id);
    res.json({
      message: "These are the user results",
      results,
    });
});

app.post("/results/", authenticateJWT, async (req, res) => {
  const result = req.body;
  //  TODO add maptype from request
  
  const mapTypes = await knex.select("*").from(tableNames.map_type);
  console.log("user is authenticated and it is ", req.user);
  const user = await findUser(req.user.email);
  await knex.table(tableNames.result).insert({
    ...result,
    user_id: user.id,
    map_type_id: mapTypes[0].id,
  });

  const results = await knex
    .select("*")
    .from(tableNames.result)
    .where("user_id", user.id);
  res.json({
    message: "Results",
    results,
  });

  // todo pass user
});

app.post('/refreshToken', refreshToken);
app.post("/signup", signup);
app.post('/signin', signin);
app.post('/signout', signout);

// todo add error handler


module.exports = app;


