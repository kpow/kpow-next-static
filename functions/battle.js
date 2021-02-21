const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  
  const { PIPEDREAM_URL } = process.env;
  const params = JSON.parse(event.body)
  const battleData = params.battleData || {};
  const API_ENDPOINT = PIPEDREAM_URL;
  const post = {battleData, timestamp:new Date()}

  return fetch(API_ENDPOINT, { headers: { Accept: "application/json" }, body:post  })
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
