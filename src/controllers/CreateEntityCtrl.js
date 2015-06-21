function CreateEntityCtrl(req, res){

	req.schema.createEntity(req.body)
		.then(function(entity){
			res.json(entity);
		})
		.catch(function(err){
			console.log(err);
			res.status(500).json('Error');
		});

}


module.exports = CreateEntityCtrl;
