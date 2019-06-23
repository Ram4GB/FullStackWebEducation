var request = require('request');

var options = {
  method: 'POST',
  url: 'https://restdb-9705.restdb.io/rest/Api-Users',
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': '077fc93c142a81fc398843870836a97d69ab8',
    'content-type': 'application/json',
  },
  body: { name: 'Ninh', email: 'ninh@gmail.com' },
  json: true,
};

request(options, function(error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
