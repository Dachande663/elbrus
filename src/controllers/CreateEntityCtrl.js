function CreateEntityCtrl(req, res){

	req.schema.createEntity(req.body)
		.then(function(entity){
			res.json(entity);
		})
		.catch(function(err){
			res.status(500).json('DB error');
		});

}


module.exports = CreateEntityCtrl;
