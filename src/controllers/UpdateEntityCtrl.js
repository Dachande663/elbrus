function UpdateEntityCtrl(req, res){

	var s = req.schema;
	var e = req.entity;

	var sets = [];
	var data = [];
	var json = {};

	for(var i = 0, len = s.fieldsMap.length; i < len; i++) {

		var f = s.fields[s.fieldsMap[i]];

		if( ! (f.key in req.body) ) {
			continue;
		}

		var d = f.parseValue(req.body);

		sets.push(f.key + ' = ?');
		data.push(d);
		e[f.key] = d;

	}

	data.push(e.id);

	req.schema.db.query('update ' + s.key + ' set ' + sets.join(', ') + ' where id = ? limit 1', data, function(err, result){
		if(err) {
			logger.error(err);
			return res.status(500).json('DB error');
		}
		res.json(e);
	})

}


module.exports = UpdateEntityCtrl;
