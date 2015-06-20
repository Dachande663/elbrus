var express = require('express');
var AuthMiddleware = require('./middleware/AuthMiddleware');
var GetSchemaMiddleware = require('./middleware/GetSchemaMiddleware');
var GetEntityMiddleware = require('./middleware/GetEntityMiddleware');
var JsonParserMiddleware = require('body-parser').json();


function init() {

	var app = express();

	app.disable('etag');
	app.disable('x-powered-by');

	app.get('/',
			AuthMiddleware,
			require('./controllers/ListSchemasCtrl')
		);

	app.get('/:collection',
			AuthMiddleware,
			GetSchemaMiddleware,
			require('./controllers/ListEntitiesCtrl')
		);

	app.post('/:collection',
			AuthMiddleware,
			JsonParserMiddleware,
			GetSchemaMiddleware,
			require('./controllers/CreateEntityCtrl')
		);

	app.head('/:collection/:id',
			AuthMiddleware,
			GetSchemaMiddleware,
			GetEntityMiddleware,
			require('./controllers/CheckEntityCtrl')
		);

	app.get('/:collection/:id',
			AuthMiddleware,
			GetSchemaMiddleware,
			GetEntityMiddleware,
			require('./controllers/GetEntityCtrl')
		);

	app.put('/:collection/:id',
			AuthMiddleware,
			JsonParserMiddleware,
			GetSchemaMiddleware,
			GetEntityMiddleware,
			require('./controllers/UpdateEntityCtrl')
		);

	app.delete('/:collection/:id',
			AuthMiddleware,
			GetSchemaMiddleware,
			GetEntityMiddleware,
			require('./controllers/DeleteEntityCtrl')
		);

	return app;

}


module.exports = init;
