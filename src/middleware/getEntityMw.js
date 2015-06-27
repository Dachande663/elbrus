function getEntityMw(req, res, next) {

	var schema = req.elbrus.schema;

	schema.repository.getEntity(req.params.id).then(function(entity){
		if(!entity) {
			return res.status(404).send('Entity not found');
		}
		req.elbrus = req.elbrus || {};
		req.elbrus.entity = entity;
		next();
	});

}


module.exports = getEntityMw;
