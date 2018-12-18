const http = require('http');
const fs = require('fs');
const mime = require('mime');
const extract = require('./extract');
const handleError = require('./handleError');
const wss = require('./websockets-server');
// const bot = require('./bot');

const server = http.createServer((req, res) => {
  // res.end('<h1> hello, world!!!</h1>');
  const filePath = extract(req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      handleError(err, res, 404);
    } else {
      // console.log(mime.getType(filePath));
      res.setHeader('content-Type', mime.getType(filePath));
      res.end(data);
    }
  });
});

server.listen(3000);
