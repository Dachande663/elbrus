require('dotenv').load();


var express = require('express');
var app = express();
app.disable('etag');
app.disable('x-powered-by');


app.get('/', function(req, res){
	res.json({
		name: 'Elbrus',
		version: 1
	});
});


var Elbrus = require('./elbrus');
var api = Elbrus();
app.use('/' + process.env.API_PATH, api);


var server = app.listen(process.env.API_PORT || 3001, function(){

	var host = server.address().address;
	var port = server.address().port;

	console.log('Elbrus listening at http://%s:%s', host, port);

});
