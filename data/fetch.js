const fetch = require("node-fetch");
const { LAST_FM_KEY } = process.env;
const API_ENDPOINT = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=krakap&api_key="+LAST_FM_KEY+"&format=json&limit=50page=1";

exports.handler = async (event, context) => {
  let response
  try {
    response = await fetch(API_ENDPOINT)
    console.log(API_ENDPOINT)
    console.log(response)
    return {
      statusCode: 200,
      body: JSON.stringify({
        data: response
      })
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  
}