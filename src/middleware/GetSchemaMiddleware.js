var Schemas = require('../schemas');


function GetSchemaMiddlware(req, res, next) {

	if( ! ('collection' in req.params) ) {
		res.status(404).json('Collection not found');
		return;
	}

	Schemas.getSchemaByUrlSlug(req.params.collection)
		.then(function(schema){
			req.schema = schema;
			next();
		})
		.catch(function(err){
			res.status(404).json('Schema not found');
		});

}


module.exports = GetSchemaMiddlware;
