const fetch = require("node-fetch");
const { LAST_FM_KEY } = process.env;
const API_ENDPOINT = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=krakap&api_key="+LAST_FM_KEY+"&format=json&limit=50page=1";


// const API_ENDPOINT = "https://services.kpow.com/scrobbles.php?page="+1+"&perPage="+109;

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
