const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { YELP_KEY } = process.env;
  const params = JSON.parse(event.body);
  const location = params.post;
  const API_ENDPOINT = `https://api.yelp.com/v3/businesses/search?limit=50&radius=40000&categories=donuts,doughnuts&latitude=${location.latitude}&longitude=${location.longitude}`;

  return fetch(API_ENDPOINT, { headers: { Authorization: `Bearer ${YELP_KEY}` } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
