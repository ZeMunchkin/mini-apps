var express = require('express');
var parse = require('body-parser');
var fs = require('fs');

var app = express();

app.use(parse.json());

app.get('/', function (req, res) {
  console.log('index get!');
  fs.readFile('./client/index.html', function (err, result) {
    if (err) {
      res.sendStatus(404);
    }
    res.set('content-type', 'text/html');
    res.send(result);
  });
});

app.get('/app.js', function (req, res) {
  console.log('app get!');
  fs.readFile('./client/app.js', function (err, result) {
    if (err) {
      res.sendStatus(404);
    }
    res.set('content-type', 'application/json');
    res.send(result);
  });
});

app.post('/', function (req, res) {
  console.log('post!');
  console.log('req body:', req.body);

});

app.listen(3000);

