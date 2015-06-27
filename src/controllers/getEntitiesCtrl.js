var QueryParams = require('../classes/QueryParams');
var hydrator = require('../init/hydrator');


function getEntitiesCtrl(req, res) {

	var schema = req.elbrus.schema;
	var params = new QueryParams(schema);

	params.parseInput(req.query)
		.then(function(params){
			return schema.repository.getEntities(params);
		})
		.then(function(rows){
			return hydrator.hydrateRows(schema, rows);
		})
		.then(function(rows){
			return schema.transformer.collection(rows);
		})
		.then(function(entities){
			res.json({
				items: entities
			});
		});

}


module.exports = getEntitiesCtrl;
