const http = require('http');
const fs = require('fs');
const extract = require('./extract');

const handleError = function handleError(err, res) {
  res.writeHead(404);
  res.end();
};

const server = http.createServer((req, res) => {
  // res.end('<h1> hello, world!!!</h1>');
  const filePath = extract(req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      handleError(err, res);
    } else {
      res.end(data);
    }
  });
});

server.listen(3000);
