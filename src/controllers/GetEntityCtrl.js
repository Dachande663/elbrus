var hydrator = require('../init/hydrator');


function getEntityCtrl(req, res) {

	var schema = req.elbrus.schema;
	var entity = req.elbrus.entity;

	hydrator.hydrateRow(schema, entity)
		.then(function(row){
			return schema.transformer.entity(row);
		})
		.then(function(entity){
			res.json({
				item: entity
			});
		});

}


module.exports = getEntityCtrl;
