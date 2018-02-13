var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
	console.log('index get!');
	fs.readFile('./index.html', function (err, results) {
		if (err) {
			res.sendStatus(404);
		}
		res.set('content-type', 'text/html');
		res.send(results.toString());
	});
});

app.get('/style.css', function (req, res) {
	console.log('styles get!');
	fs.readFile('./style.css', function (err, results) {
		if (err) {
			res.sendStatus(404);
		}
		res.set('content-type', 'text/css');
		res.end(results.toString());
	});
});

app.get('/app.js', function (req, res) {
	console.log('app get!');
	fs.readFile('./app.js', function (err, results) {
		if (err) {
			res.sendStatus(404);
		}
		res.set('content-type', 'application/json');
		res.end(results.toString());
	});
})

app.listen(3000);





