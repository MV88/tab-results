import axios from 'axios';

/**
 * sends a request to the backend to fetch all the user results
 * @param user user information: token, id
 * @return all user results
 */
export const getUserResults = ({accessToken}) => axios.post(`https://localhost/results/byUser`, undefined, {
  headers: {
    "Authorization": `bearer ${accessToken}`,
}});


/**
 * 
 * @param {object} result 
 * @param {object} user
 */
export const postResults = (result, {accessToken}) => axios.post(`https://localhost/results/`, result, {
  headers: {
    "Authorization": `bearer ${accessToken}`,
}})
  .then(response => response.data)
  .catch(function (error) {
    
    console.log(error);
  });

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
    });
}

/**
 * 
 * @param {*} user
 */


export const signin = (user) => {

  return axios.post(`https://localhost/signin`, user)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const signout = ({accessToken}) => {
  return axios.post(`https://localhost/signout`, undefined, {
    headers: {
      "Authorization": `bearer ${accessToken}`,
  }})
    .then(response => response.data)
    .catch(function (error) {
      console.log(error);
      return error.response.data; 
    });
}