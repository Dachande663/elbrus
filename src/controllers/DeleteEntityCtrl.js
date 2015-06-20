function DeleteEntityCtrl(req, res){

	req.schema.db.query('delete from ' + req.schema.key + ' where id = ? limit 1', req.entity.id, function(err, result){
		if(err) {
			logger.error(err);
			return res.status(500).json('DB error');
		}
		res.json(true);
	});

}


module.exports = DeleteEntityCtrl;
