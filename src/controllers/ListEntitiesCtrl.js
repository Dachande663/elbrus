function ListEntitiesCtrl(req, res){

	req.schema.getEntities(req.query)
		.then(function(entities){
			res.json(entities);
		})
		.catch(function(err){
			res.status(500).json('DB error');
		});

}


module.exports = ListEntitiesCtrl;
