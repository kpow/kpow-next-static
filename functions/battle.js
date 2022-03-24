const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { PIPEDREAM_URL } = process.env;
  const params = JSON.parse(event.body);
  const battleData = params.battleData || {};
  const API_ENDPOINT = PIPEDREAM_URL;
  const post = { battleData, timestamp: new Date() };

  return fetch(API_ENDPOINT, { method: 'post', headers: { Accept: 'application/json' }, body: JSON.stringify(post) })
    .then((data) => ({ statusCode: 200, body: JSON.stringify(data) }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
