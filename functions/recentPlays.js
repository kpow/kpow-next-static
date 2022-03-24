const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { LAST_FM_KEY } = process.env;
  const params = JSON.parse(event.body);
  const page = params.page || 0;
  const howMany = params.howMany || 20;
  const API_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=krakap&api_key=${LAST_FM_KEY}&format=json&limit=${howMany}page=${page}`;

  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
