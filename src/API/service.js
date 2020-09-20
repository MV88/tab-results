const axios = require('axios');

const port = process.env.PORT || 5050;

export const getResults = () => fetch(`http://localhost:${port}/results`);



export const postResults = (results) => axios.post(`http://localhost:${port}/results`, results)
  .then(response => response.data)
  .catch(function (error) {
    console.log(error);
  });;