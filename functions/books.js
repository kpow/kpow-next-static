const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { GOOD_READS_KEY } = process.env;
  const params = JSON.parse(event.body);
  const page = params.page || 0;
  const howMany = params.howMany || 20;
  const API_ENDPOINT = `https://www.goodreads.com/review/list/457389.xml?key=${GOOD_READS_KEY}&v=2&per_page=${howMany}&page=${page}`;

  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((response) => response.text().then((result) => result))
    .then((data) => ({
      statusCode: 200,
      body: data,
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
