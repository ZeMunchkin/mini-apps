var express = require('express');
var parse = require('body-parser');
var fs = require('fs');

var app = express();

app.use(parse.json());

app.get('/', function (req, res) {
  console.log('init get!');
  fs.readFile('./client/index.html', function (err, results) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.set('Content-Type', 'text/html');
      console.log(results.toString());
      res.send(results.toString());
    }
  });
});

app.get('/bundle.js/', function (req, res) {
  console.log('bundle get!');
  fs.readFile('./client/bundle.js', function (err, results) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.set('content-type', 'application/javascript');
      res.send(results.toString());
    }
  });
});

app.get('/style.css', function (req, res) {
  console.log('css get!');
  fs.readFile('./client/style.css', function (err, results) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.set('content-type', 'text/css');
      res.send(results.toString());
    }
  });
});

app.get('/*', function (req, res) {
  console.log('other get!');
  console.log(req.url);
});

app.listen(3000, function () {
  console.log('listening on port 3000!')
});

