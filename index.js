require('dotenv').load();

var express = require('express');
var app = express();
app.disable('etag');
app.disable('x-powered-by');


var Elbrus = require('./src');
var api = Elbrus();
app.use('/v1', api);


app.get('/', function(req, res){
	res.json({
		name: 'Elbrus',
		version: 1
	});
});


var server = app.listen(process.env.API_PORT || 3001, function(){

	var host = server.address().address;
	var port = server.address().port;

	console.log('Elbrus listening at http://%s:%s', host, port);

});
