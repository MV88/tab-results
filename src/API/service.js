import axios from 'axios';
import pick from 'lodash/pick';


/**
 * sends a request to the backend to fetch all the user results
 * @param user user information: token, id
 * @return all user results
 */
export const getUserResults = (user) => axios.post(`https://localhost/userResults`, pick(user, ["email", "token"]));


/**
 * 
 * @param {*} results 
 */
export const postResults = (results) => axios.post(`https://localhost/results`, results)
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