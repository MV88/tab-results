const tableNames = require('../constants/tableNames');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);

// check out bcrypt's docs for more info on their hashing function
const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    }),
  );
};

// user will be saved to db - we're explicitly asking postgres to return back helpful info from the row created
const createUser = (user) => {
  return knex.table(tableNames.user).insert(user).returning("*").then((data) => {
    return data[0];
  });
};

// crypto ships with node - we're leveraging it to create a random, secure token
const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'));
    });
  });
};


// app/models/user.js
const signup = (request, response) => {
  const user = request.body;
  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password;
      user.password_digest = hashedPassword;
    })
    .then(() => createToken())
    .then(token => user.token = token)
    .then(() => createUser(user))
    .then(user => {
      delete user.password_digest;
      response.status(201).json(user);
    })
    .catch((err) => console.error(err));
};

const findUser = (userReq) => {
  return knex.select("*").from(tableNames.user).where("email", userReq.email).then((data) => {
    return data[0];
  },
  );
};

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
        if (err) {
          reject(err);
        }
        else if (response) {
          resolve(response);
        } else {
          reject(new Error('Passwords do not match.'));
        }
    }),
  );
};

const updateUserToken = (token, user) => {

  return knex(tableNames.user).where("email", user.email).update({"token": token}, ["token", "id"]).then((data) => data[0]);
};

const signin = (request, response) => {
  const userReq = request.body;
  let user;

  findUser(userReq)
    .then(foundUser => {
      user = foundUser;
      return checkPassword(userReq.password, foundUser);
    })
    .then((res) => createToken())
    .then(token => updateUserToken(token, user))
    .then(({token}) => {
      delete user.password_digest;
      response.status(200).json({
        ...user,
        token,
      });
    })
    .catch((err) => console.error(err));
};

const findByToken = (token) => {
  return knex
    .select("*")
    .from(tableNames.user)
    .where("token", token)
    .then((data) => data[0]);
};

// app/models/user.js
const authenticate = async (userReq) => {
  const isAuthenticated = await findByToken(userReq.token)
    .then((user) => {
      if (user && user.id === userReq.id) {
        return true;
      } else {
        return false;
      }
    });
    return isAuthenticated;
};

// don't forget to export!
module.exports = {
  signup,
  signin,
  authenticate,
};