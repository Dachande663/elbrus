function UpdateEntityCtrl(req, res){

	req.schema.updateEntity(req.entity, req.body)
		.then(function(entity){
			res.json(entity);
		})
		.catch(function(err){
			console.log(err);
			res.status(500).json('Error');
		});

}


module.exports = UpdateEntityCtrl;
