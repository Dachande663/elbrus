function ListEntitiesCtrl(req, res){

	// @todo query

	req.schema.db.query('select * from ' + req.schema.key + ' order by created desc', function(err, rows){
		if(err) {
			logger.error(err);
			return res.status(500).json('DB error');
		}
		res.json(rows);
	});

}


module.exports = ListEntitiesCtrl;
