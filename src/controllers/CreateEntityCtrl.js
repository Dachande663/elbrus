function CreateEntityCtrl(req, res){

	var s = req.schema;

	var cols = [];
	var plcs = [];
	var data = [];
	var json = {};

	for(var i = 0, len = s.fieldsMap.length; i < len; i++) {

		var f = s.fields[s.fieldsMap[i]];
		var d = f.parseValue(req.body);

		cols.push(f.key);
		plcs.push('?');
		data.push(d);
		json[f.key] = d;

	}

	req.schema.db.query('insert into ' + s.key + ' (' + cols.join(', ') + ') values (' + plcs.join(', ') + ')', data, function(err, result){
		if(err) {
			logger.error(err);
			return res.status(500).json('DB error');
		}
		res.json(json);
	});

}


module.exports = CreateEntityCtrl;
