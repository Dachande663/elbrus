var BaseError = require('../errors/BaseError');
var logger = require('../logger');


function UpdateEntityCtrl(req, res){

	req.schema.updateEntity(req.entity, req.body)
		.then(function(entity){
			res.json(entity);
		})
		.catch(function(err){
			if(err instanceof BaseError) {
				res.status(err.getCode()).json(err.getOutput());
			} else {
				logger.error(err);
				res.status(500).json('An unexpected error occurred');
			}
		});

}


module.exports = UpdateEntityCtrl;
