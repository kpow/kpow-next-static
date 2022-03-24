const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { GOOD_READS_KEY } = process.env;
  const API_ENDPOINT = `https://www.goodreads.com/shelf/list.xml?key=${GOOD_READS_KEY}&user_id=457389`;

  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((response) => response.text().then((result) => result))
    .then((data) => ({
      statusCode: 200,
      body: data,
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
