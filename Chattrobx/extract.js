const path = require('path');

const extractFilePath = function extractFilePath(url) {
  let filePath;
  // console.log(url);
  let fileName = 'index.html';
  if (url.length > 1) {
    fileName = url.substring(1);
  }
  console.log(fileName);
  filePath = path.resolve(__dirname, 'app', fileName);
  return filePath;
};
module.exports = extractFilePath;
