var schemas = require('../init/schemas');


function getSchemaMw(req, res, next) {

	schemas.getSchema(req.params.collection).then(function(schema){
		if(!schema) {
			return res.status(404).send('Schema not found');
		}
		req.elbrus = req.elbrus || {};
		req.elbrus.schema = schema;
		next();
	});

}


module.exports = getSchemaMw;
