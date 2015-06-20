function UpdateEntityCtrl(req, res){

	req.schema.updateEntity(req.entity, req.body)
		.then(function(entity){
			res.json(entity);
		})
		.catch(function(err){
			res.status(500).json('DB error');
		});

}


module.exports = UpdateEntityCtrl;
