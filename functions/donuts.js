const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  
  const { YELP_KEY } = process.env;
  const API_ENDPOINT = "https://api.yelp.com/v3/businesses/search?term=donuts&latitude=37.786882&longitude=-122.399972";

  return fetch(API_ENDPOINT, { headers: { Authorization: `Bearer ${YELP_KEY}` } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify({
        data
      }),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
