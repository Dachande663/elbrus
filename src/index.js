require('dotenv').load();


var express = require('express');
var jsonBody = require('body-parser').json();
var getSchemaMw = require('./middleware/getSchemaMw');
var getEntityMw = require('./middleware/getEntityMw');


function init() {

	var app = express();
	app.disable('etag');
	app.disable('x-powered-by');

	app.get('/:collection', getSchemaMw, require('./controllers/getEntitiesCtrl'));
	app.post('/:collection', getSchemaMw, jsonBody, require('./controllers/createEntityCtrl'));
	app.head('/:collection/:id', getSchemaMw, getEntityMw, require('./controllers/existsEntityCtrl'));
	app.get('/:collection/:id', getSchemaMw, getEntityMw, require('./controllers/getEntityCtrl'));
	app.put('/:collection/:id', getSchemaMw, getEntityMw, jsonBody, require('./controllers/updateEntityCtrl'));
	app.delete('/:collection/:id', getSchemaMw, getEntityMw, require('./controllers/deleteEntityCtrl'));

	return app;

}


module.exports = init;
