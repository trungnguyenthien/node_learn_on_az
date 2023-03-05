const axios = require('axios');

async function httpGet(url) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const response = await axios.request({
        method: 'get',
        url: url,
        headers: config.headers
      });
  
      const data = JSON.parse(response.data);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  module.exports = httpGet