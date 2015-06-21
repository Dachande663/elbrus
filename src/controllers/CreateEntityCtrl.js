var ValidationError = require('../errors/ValidationError');


function CreateEntityCtrl(req, res){

	req.schema.createEntity(req.body)
		.then(function(entity){
			res.json(entity);
		})
		.catch(function(err){
			if(err instanceof ValidationError) {
				res.status(400).json(err.errors);
			} else {
				res.status(500).json('Error');
			}
		});

}


module.exports = CreateEntityCtrl;
