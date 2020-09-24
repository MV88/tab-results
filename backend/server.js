const express = require('express');
// const axios = require('axios');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const { signup, authenticate, signin } = require('./src/models/user');



const key = fs.readFileSync(__dirname + '/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/selfsigned.crt');
const options = {
  key: key,
  cert: cert,
};

// todo add body parser
const app = express();

const server = https.createServer(options, app);
server.listen(process.env.HTTPS_PORT, () => {
  console.log("server starting on port : " + process.env.HTTPS_PORT);
});

const bodyParser = require('body-parser');
const tableNames = require('./src/constants/tableNames');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const knex = require('knex')(configuration);

const jsonParser = bodyParser.json();


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
app.post("/userResults", async (req, res) => {
  const userReq = req.body;
  
  if (authenticate(userReq)) {
    const results = await knex.select("*").from(tableNames.result).where("email", userReq.email);
    res.json({
      message: "These are the user results",
      results,
    });
  } else {
    res.status(404);
  }
});

app.post("/results", async (req, res) => {
  const body = req.body;
  const users = await knex.select("*").from(tableNames.user).where("id", body.id);
  
  // const mapTypes = await knex.select("*").from(tableNames.map_type).where("map_type", req.map_type);
  const mapTypes = await knex.select("*").from(tableNames.map_type);
  if (authenticate(body)) {
    // handler logic goes here
    await knex.table(tableNames.result).insert({
      user_id: users[0].id,
      map_type_id: mapTypes[0].id,
      ...body.result,
    });
  
    const results = await knex.select("*").from(tableNames.result);
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
// todo add error handler

app.post('/signin', signin);

// with authentication
/*
const userPhotos = (request, response) => {
  const userReq = request.body
  if (authenticate(userReq) {
      // handler logic goes here
   } else {
      response.status(404)
   }
}*/



module.exports = app;


