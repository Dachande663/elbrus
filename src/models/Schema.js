var Promise = require('bluebird');


class Schema {

	// @todo db_table

	constructor(key, db) {
		this.key = key;
		this.db = db;
		this.fields = {};
		this.fieldsMap = [];
	}

	addField(f) {
		this.fields[f.key] = f;
		this.fieldsMap.push(f.key);
		return this;
	}

	getEntity(id) {

		var deferred = Promise.defer();

		this.db.query('select * from ' + this.key + ' where id = ? limit 1', id, function(err, rows){

			if(rows.length === 0) {
				return deferred.reject('Entity not found');
			}

			return deferred.resolve(rows[0]);

		});

		return deferred.promise;

	}

}


module.exports = Schema;
