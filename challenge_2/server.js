var express = require('express');
var parse = require('body-parser');
var fs = require('fs');

var allData = [];

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

  console.log(req.body);


  // var reqFields = req.body.csv.split('\n');
  // console.log(reqFields);

  // var data = [];

  // reqFields.forEach( person => {
  //   personArray = person.split(',');
  //   personObject = {
  //     firstName: personArray[0],
  //     lastName: personArray[1],
  //     county: personArray[2],
  //     city: personArray[3],
  //     role: personArray[4],
  //     sales: personArray[5],
  //     children: [],
  //   };
  //   data.push(personObject)
  // });

  // console.log(data);

  // res.set('content-type', 'application/json');
  // res.send(JSON.stringify(inputObject));

});

app.listen(3000);

