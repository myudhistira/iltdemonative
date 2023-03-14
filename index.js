'use strict';

const http = require('http');
const contacts = require('./contacts.js');

(async () => {
  const server = http.createServer((req, res) => {
    Response.setHeader( 'Content-Type', 'application/json' );
    res.end(JSON.stringify(contacts));
  });

  server.listen(3000);
  console.log('Server listening on port 3000');
})();