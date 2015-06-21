var logger = require('../logger');


function DeleteEntityCtrl(req, res){

	req.schema.deleteEntity(req.entity)
		.then(function(){
			res.json({ deleted:true });
		})
		.catch(function(err){
			logger.error(err);
			res.status(500).json('An unexpected error occurred');
		});

}


module.exports = DeleteEntityCtrl;
