var BaseError = require('../errors/BaseError');


function UpdateEntityCtrl(req, res){

	req.schema.updateEntity(req.entity, req.body)
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


module.exports = UpdateEntityCtrl;
