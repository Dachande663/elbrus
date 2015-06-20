function GetEntityMiddleware(req, res, next) {

	if( ! ('id' in req.params) ) {
		res.status(404).json('Entity not found');
		return;
	}

	req.schema.findEntity(req.params.id)
		.then(function(entity){
			req.entity = entity;
			next();
		})
		.catch(function(err){
			console.log(err);
			res.status(404).json('Entity not found');
		});

}


module.exports = GetEntityMiddleware;
