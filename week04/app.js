const https = require("https");
const http = require('http');

// const net = require('net');
// const { URL } = require('url');

const get = () => {
  let data = "";
  https.get('https://shuapi.jiaston.com/book/115088/', 
    res => {
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        console.log(data);
      });
      res.on("error", err => {
        console.log(err.message);
      });
    }
  );
}


 
var server = http.createServer(function (req, res) {
  if (req.url == "/chapters") {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
  }
});
server.listen('7999', function () {
  console.log((new Date()) + ' Server is listening on port 8080', 8080);
}


get()