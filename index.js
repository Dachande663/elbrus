require('dotenv').load();

var express = require('express');
var app = express();


var Elbrus = require('./src');
var api = Elbrus();
app.use('/v1', api);


app.get('/', function(req, res){
	res.json({
		name: 'Elbrus',
		version: 1
	});
});


var server = app.listen(3001, function(){

	var host = server.address().address;
	var port = server.address().port;

	console.log('Elbrus listening at http://%s:%s', host, port);

});