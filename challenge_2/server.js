var express = require('express');
var parse = require('body-parser');
var helpers = require('./helperFunctions.js');
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

app.get('/style.css', function (req, res) {
  console.log('style get!');
  fs.readFile('./client/style.css', function (err, result) {
    if (err) {
      res.sendStatus(404);
    }
    res.set('content-type', 'text/css');
    res.send(result);
  });
});

app.post('/', function (req, res) {
  console.log('post!');
  var filter = req.body.filter;

  //parse the request into a working object
  var resultObject = helpers.parseResults(req.body.csv);
  //create an array with all the table data needed from each employee
  var employeeTable = helpers.createTableArray(resultObject, filter);
  //combine into a string before sending
  employeeTable = employeeTable.join('');
  
  //send response with results
  res.set('content-type', 'text/plain');
  res.status(201);
  res.send(employeeTable);

});

app.listen(3000);

