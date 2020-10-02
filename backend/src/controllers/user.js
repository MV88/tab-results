const tableNames = require('../constants/tableNames');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const knex = require('knex')(configuration);

const EXPIRES_IN = "5s";
let refreshTokens = [];

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


const findUser = (email) => {
  return knex.select("*").from(tableNames.user).where("email", email).then((data) => {
    return data[0];
  },
  );
};

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, res) => {
        if (err) {
          reject(err);
        }
        else if (res) {
          resolve(res);
        } else {
          reject(new Error('Passwords do not match.'));
        }
    }),
  );
};


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

/**
 * 
 * @param {*} email 
 * @param {*} expiresIn 
 * @param {*} secret 
 */
const createToken = (email, expiresIn, secret = process.env.ACCESS_SECRET_TOKEN) => jwt.sign({email}, secret, expiresIn ? {expiresIn} : {});

const signup = (req, res) => {
  const user = req.body;
  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password;
      user.password_digest = hashedPassword;
    })
    .then(() => createUser(user))
    .then(user => {
      delete user.password_digest;
      const accessToken = createToken(user.email, EXPIRES_IN );
      const refreshToken = createToken(user.email, undefined, process.env.ACCESS_SECRET_REFRESH_TOKEN );
      refreshTokens.push(refreshToken);

      res.status(201).json({
        accessToken,
        refreshToken,
      });
    })
    .catch((err) => console.error(err));
};

const signin = (req, res) => {
  const userReq = req.body;
  let user;
  console.log("signin", userReq);

  findUser(userReq.email)
    .then(foundUser => {
      user = foundUser;
      return checkPassword(userReq.password, foundUser);
    })
    .then(() => {
      delete user.password_digest;
      const accessToken = createToken(user.email, EXPIRES_IN );
      const refreshToken = createToken(user.email, undefined, process.env.ACCESS_SECRET_REFRESH_TOKEN );
      refreshTokens.push(refreshToken);
      console.log("accessToken", accessToken);

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    })
    .catch((err) => {
      console.error(err);
      res.json({
        message: "Username or password incorrect",
      });
    });
};

const refreshToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
  
    if (!token) {
        return res.sendStatus(401);
    }
  
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }
  
    jwt.verify(token, process.env.ACCESS_SECRET_REFRESH_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
              message: "your token has been expired",
            });
        }
        const accessToken = createToken(user.email, EXPIRES_IN );
  
        res.json({
            accessToken,
        });
    });
  } else {
    console.log("no token provided");
    res.sendStatus(401);
  }
};

const signout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
  
    if (!token) {
        return res.sendStatus(401);
    }
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.status(200).json({
      message: "Logout successful",
    });
  }
};


module.exports = {
  signup,
  signin,
  signout,
  refreshToken,
  findUser,
  authenticateJWT,
};