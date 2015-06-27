function createEntityCtrl(req, res) {

	var schema = req.elbrus.schema;
	var row;

	schema.parser.parseForCreate(req.body)
		.then(function(data){
			row = data;
			return schema.repository.createEntity(data);
		})
		.then(function(result){
			return schema.transformer.entity(row);
		})
		.then(function(entity){
			// @todo 201 Location
			res.json({
				item: entity
			});
		});

}


module.exports = createEntityCtrl;
