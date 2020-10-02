const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();



/*
const fs = require('fs');
const https = require('https');
const key = fs.readFileSync(__dirname + '/localhost.key');
const cert = fs.readFileSync(__dirname + '/localhost.crt');
const options = {
  key: key,
  cert: cert,
};
*/
module.exports = (app => {

  /*const server = https.createServer(options, app);
  server.listen(process.env.HTTPS_PORT, () => {
    console.log("server starting on port : " + process.env.HTTPS_PORT);
  });
*/
  app.use(cors());
  app.use(morgan('tiny'));
  app.use(compression());
  app.use(helmet());
  app.use(jsonParser);

  return app;

});
