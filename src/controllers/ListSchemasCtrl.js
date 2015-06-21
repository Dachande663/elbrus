var Schemas = require('../schemas');


function ListSchemasCtrl(req, res){

	Schemas.getSchemas()
		.then(function(schemas){

			var collections = [];

			for(var property in schemas) {
				var schema = schemas[property];
				collections.push(schema.url_slug);
			}

			res.json({
				collections: collections
			});

		});

}


module.exports = ListSchemasCtrl;
