// const fetch = require("node-fetch");
const { LAST_FM_KEY } = process.env;
const API_ENDPOINT = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=krakap&api_key="+LAST_FM_KEY+"&format=json&limit=50page=1";

// exports.handler = async (event, context) => {
//   return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
//     .then((response) => {console.log(response); response.json();})
//     .then((data) => ({
//       statusCode: 200,
//       body: data.recentracks,
//     }))
//     .catch((error) => ({ statusCode: 422, body: String(error) }));
// };


var http = require('follow-redirects').http;
var fs = require('fs');

var options = {
  'method': 'GET',
  'hostname': 'ws.audioscrobbler.com',
  'path': '/2.0/?method=user.getrecenttracks&user=krakap&api_key='+LAST_FM_KEY+'&&format=json',
  'headers': {
  },
  'maxRedirects': 20
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();