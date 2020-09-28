const express = require('express');
require('dotenv').config();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const knex = require('knex')(configuration);

const app = require('./middlewares')(express());


const { signup, signout, authenticate, signin } = require('./src/controllers/user');
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
app.post("/userResults", async (req, res) => {
  const userReq = req.body;
  if (await authenticate(userReq)) {
    console.log("user is authenticated");
    const results = await knex
      .select("*")
      .from(tableNames.result)
      .where("user_id", userReq.id);
    res.json({
      message: "These are the user results",
      results,
    });
  } else {
    console.log("user is not authenticated");
    res.status(404);
  }
});

app.post("/results", async (req, res) => {
  const {user, result} = req.body;
  //  TODO add maptype from request
  
  const mapTypes = await knex.select("*").from(tableNames.map_type);
  if (await authenticate(user)) {
    await knex.table(tableNames.result).insert({
      user_id: user.id,
      map_type_id: mapTypes[0].id,
      ...result,
    });
  
    const results = await knex
      .select("*")
      .from(tableNames.result)
      .where("user_id", user.id);
    res.json({
      message: "Results",
      results,
    });
 } else {
    res.status(404);
 }

  // todo pass user
  

});


app.post("/signup", signup);
app.post('/signin', signin);
app.post('/signout', signout);

// todo add error handler


module.exports = app;


