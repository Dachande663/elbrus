var BaseError = require('../errors/BaseError');
var logger = require('../logger');


function CreateEntityCtrl(req, res){

	req.schema.createEntity(req.body)
		.then(function(entity){

			var url = req.protocol + '://' + req.get('host')
					  + '/' + process.env.API_PATH + '/'
					  + req.schema.url_slug + '/' + entity.id;

			res
				.status(201)
				.location(url)
				.json(entity);
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
