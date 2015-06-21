var logger = require('../logger');


function ListEntitiesCtrl(req, res){

	req.schema.getEntities(req.query)
		.then(function(entities){
			res.json({
				results: entities
			});
		})
		.catch(function(err){
				logger.error(err);
				res.status(500).json('An unexpected error occurred');
		});

}


module.exports = ListEntitiesCtrl;
