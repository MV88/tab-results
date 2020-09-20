const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
// todo add body parser
const app = express();
// const fakeResults = require('../src/resources/fakeResults');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const tableNames = require('./src/constants/tableNames');
require('dotenv').config();

const jsonParser = bodyParser.json();

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database : process.env.POSTGRES_DB,
  },
  pool: { min: 0, max: 7 },
});

app.use(cors());
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(jsonParser);


app.get("/", (req, res) => {
  res.json({
    message: "TAB result API ",
  });
});

/**
 * @param {Knex} knex
 */
app.get("/results", async (req, res) => {
  const results = await knex.select("*").from(tableNames.result);
  // const results = await fetch("http://localhost:3000/fakeResults.json").then(res => res.json());
  res.json({
    message: "Results",
    results,
  });
});

app.post("/results", async (req, res) => {

  // todo fetch data from request
  console.log("req.body", req.body);
  const results = await fetch("http://localhost:3000/fakeResults.json").then(res => res.json());
  res.json({
    message: "Results",
    results,
  });
  // todo pass user
  await knex.table(tableNames.result).insert({
    type: "W",
    population: 123,
    user_id: 1,
    map_type_id: 1,
    score: 80 * 1000,
  });

  // todo push data to database with knex
  // insert
  /*const results = await axios.exports("http://localhost:3000/.json").then(res => res.json());
  res.json({
    message: "Results",
    results,
  });*/
});
// todo add error handler

module.exports = app;
