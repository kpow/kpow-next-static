const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { FEEDBIN_KEY } = process.env;
  const API_ENDPOINT = 'https://api.feedbin.com/v2/starred_entries.json';

  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json', authorization: `Basic ${FEEDBIN_KEY}` } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
