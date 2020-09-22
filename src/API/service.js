const axios = require('axios');
const bcrypt = require('bcryptjs');
const port = process.env.PORT || 5050;

/**
 * 
 */
export const getResults = () => fetch(`http://localhost:${port}/results`);


/**
 * 
 * @param {*} results 
 */
export const postResults = (results) => axios.post(`http://localhost:${port}/results`, results)
  .then(response => response.data)
  .catch(function (error) {
    console.log(error);
  });;

/**
 * 
 * @param {*} user 
 */
export const postUser = (user) => {
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync("B4c0/\/", salt);
  return axios.post(`http://localhost:${port}/users`, {...user, password})
    .then(response => response.data)
    .catch(function (error) {
      console.log(error);
    });;
}