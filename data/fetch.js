const fetch = require("node-fetch");

const API_ENDPOINT = "https://services.kpow.com/scrobbles.php?page="+1+"&perPage="+10;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify({
        data: data
      }),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
