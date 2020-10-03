import axios from 'axios';
const serverUrl = "http://localhost:5050";
/**
 * sends a request to the backend to fetch all the user results
 * @param user user information: token, id
 * @return all user results
 */
export const getUserResults = ({accessToken}) => axios.post(`${serverUrl}/results/byUser`, undefined, {
  headers: {
    "Authorization": `bearer ${accessToken}`,
}});


/**
 * 
 * @param {object} result 
 * @param {object} user
 */
export const postResults = (result, {accessToken}) => axios.post(`${serverUrl}/results/`, result, {
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
  return axios.post(`${serverUrl}/signup`, user)
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

  return axios.post(`${serverUrl}/signin`, user)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const signout = ({accessToken}) => {
  return axios.post(`${serverUrl}/signout`, undefined, {
    headers: {
      "Authorization": `bearer ${accessToken}`,
  }})
    .then(response => response.data)
    .catch(function (error) {
      console.log(error);
      return error.response.data; 
    });
}