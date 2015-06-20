var schemas = require('../schemas');


function GetSchemaMiddlware(req, res, next) {

	if( ! ('collection' in req.params) ) {
		res.status(404).json('Collection not found');
		return;
	}

	var schema = schemas.getSchema(req.params.collection);

	if(!schema) {
		res.status(404).json('Collection not found');
	}

	req.schema = schema;

	next();

}


module.exports = GetSchemaMiddlware;
