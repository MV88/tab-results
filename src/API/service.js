const axios = require('axios');
const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);
const port = process.env.PORT || 5050;


/**
 * 
 */
export const getResults = () => fetch(`https://localhost:/results`);


/**
 * 
 * @param {*} results 
 */
export const postResults = (results) => axios.post(`https://localhost:/results`, results)
  .then(response => response.data)
  .catch(function (error) {
    console.log(error);
  });;

/**
 * 
 * @param {*} user 
 */
export const signup = (user) => {
  // const password = bcrypt.hashSync(user.password, salt);
  return axios.post(`https://localhost/signup`, user)
    .then(response => response.data)
    .catch(function (error) {
      console.log(error);
    });;
}

/**
 * 
 * @param {*} user
 */


export const signin = (user) => {

  return axios.post(`https://localhost/signin`, user)
    .then(response => response.data)
    .catch(function (error) {
      console.log(error);
      return error.response.data; 
    });;
}