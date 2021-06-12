var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
// 就一个端口参数
// lander 3000

var defaultPage = 'index.html';

module.exports = function(port) {

  // default port 3000
  port = port ? Number(port) : 3000;
  http.createServer(print).listen(port);
  console.log('server start at prot: ' + port);

};

function print(req, res) {

  // handle with req.url and cwd
  var cwd = process.cwd();
  var reqUrl = req.url;
  var pathName = url.parse(reqUrl).pathname;
  var extName = path.extname(pathName);

  if (extName){
    var filePath = path.join(cwd + '/' , pathName);
    fs.exists(filePath, function(exists) {

      if (exists) {
        res.writeHead(200, {'Content-Type': getContentType(filePath) });
        var stream = fs.createReadStream(filePath, {flags: 'r', encoding: null});
        stream.on('error', function() {
          res.writeHead(404);
          res.end('<h1>404 Read Error');
        });
        stream.pipe(res);

      }else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 Not Found</h1>');
      }

    })
  }else {
    fs.readFile(cwd + '/' + defaultPage, function(err, data) {
      if (err){
        res.writeHead(404);
        res.end('Error loading' + defaultPage);
      }else {
        res.writeHead(200);
        res.end(data);
      }
    })
  }

}



// get Content-Type
var getContentType = function(filePath) {
  var contentType = '';
  var ext = path.extname(filePath);
  switch(ext) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.ico':
      contentType = 'image/icon';
      break;
    default:
      contentType = 'application/octet-stream';
  }
  return contentType;
};
