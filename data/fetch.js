const fetch = require("node-fetch");
const { LAST_FM_KEY } = process.env;
const API_ENDPOINT = "https://services.kpow.com/scrobbles.php?page="+1+"&perPage="+10;
const name = 'kpow';
exports.handler = async (event, context) => {
  
  return fetch(API_ENDPOINT, {method: 'GET', headers: { } })
    .then((response) => {response.json();})
    .then((data) => ({
      statusCode: 200,
      body: data.json()
    }))
    .then((data)=>{console.log(data); })
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
