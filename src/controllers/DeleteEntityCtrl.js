function DeleteEntityCtrl(req, res){

	req.schema.deleteEntity(req.entity)
		.then(function(){
			res.json({ deleted:true });
		})
		.catch(function(err){
			res.status(500).json('DB error');
		});

}


module.exports = DeleteEntityCtrl;
