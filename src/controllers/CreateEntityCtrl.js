var BaseError = require('../errors/BaseError');


function CreateEntityCtrl(req, res){

	req.schema.createEntity(req.body)
		.then(function(entity){
			res.json(entity);
		})
		.catch(function(err){
			if(err instanceof BaseError) {
				res.status(err.getCode()).json(err.getOutput());
			} else {
				res.status(500).json('An unexpected error occurred');
			}
		});

}


module.exports = CreateEntityCtrl;
