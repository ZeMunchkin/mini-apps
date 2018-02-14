var express = require('express');
var parse = require('body-parser');
var fs = rquire('fs');

var app = express();

app.use(parse.json());

app.get('/', function (req, res) {
  fs.readFile('./index.html', function (err, results) {
    if (err) {
      res.sendStatus(404);
    }
    res.set('content-type', 'test/html');
    res.send(results);
  });
});

app.get('/app.jsx', function (req, res) {
  fs.readFile('./app.jsx', function (err, results) {
    if (err) {
      res.sendStatus(404);
    }
    res.set('content-type', 'application/json');
    res.send(results);
  });
});

app.get('/style.css', function (req, res) {
  fs.readFile('./style.css', function (err, results) {
    if (err) {
      res.sendStatus(404);
    }
    res.set('content-type', 'test/css');
    res.send(results);
  });
});

app.listen(3000);

