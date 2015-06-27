var express = require('express');
var jsonBody = require('body-parser').json();
var getSchemaMw = require('./src/middleware/getSchemaMw');
var getEntityMw = require('./src/middleware/getEntityMw');


function init(app) {

	var app = app || express();
	app.disable('etag');
	app.disable('x-powered-by');

	app.get('/:collection', getSchemaMw, require('./src/controllers/getEntitiesCtrl'));
	app.post('/:collection', getSchemaMw, jsonBody, require('./src/controllers/createEntityCtrl'));
	app.head('/:collection/:id', getSchemaMw, getEntityMw, require('./src/controllers/existsEntityCtrl'));
	app.get('/:collection/:id', getSchemaMw, getEntityMw, require('./src/controllers/getEntityCtrl'));
	app.put('/:collection/:id', getSchemaMw, getEntityMw, jsonBody, require('./src/controllers/updateEntityCtrl'));
	app.delete('/:collection/:id', getSchemaMw, getEntityMw, require('./src/controllers/deleteEntityCtrl'));

	return app;

}


module.exports = init;
