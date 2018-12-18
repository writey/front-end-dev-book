const fs = require('fs');
const mime = require('mime');

const handleError = function handleError(err, res, code) {
  // res.writeHead(404);
  const noFilePath = `App/error/${code}.html`;
  // console.log(err);
  fs.readFile(noFilePath, (err, data) => {
    res.setHeader('content-Type', mime.getType(noFilePath));
    res.end(data);
  });
};
module.exports = handleError;
