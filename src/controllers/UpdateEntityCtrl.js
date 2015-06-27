function updateEntityCtrl(req, res) {

	var schema = req.elbrus.schema;
	var entity = req.elbrus.entity;

	schema.parser.parseForUpdate(req.body, entity)
		.then(function(result){
			entity = result.entity;
			return schema.repository.updateEntity(req.elbrus.entity._id, result.data);
		})
		.then(function(row){
			return schema.transformer.entity(entity);
		})
		.then(function(entity){
			res.json({
				item: entity
			});
		});

}


module.exports = updateEntityCtrl;
