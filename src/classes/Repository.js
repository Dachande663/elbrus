class Repository {


	constructor(db, schema) {
		this.db = db;
		this.schema = schema;
	}


	getEntities(params) {
		return this._generateQuery(params).select();
	}


	getEntity(id) {
		return this.db(this.schema.slug).where('_id', id).first();
	}


	createEntity(data) {
		return this.db(this.schema.slug).insert(data)
			.then(function(rows){
				return (rows.length === 1);
			});
	}


	updateEntity(id, data) {
		return this.db(this.schema.slug).where('_id', id).limit(1).update(data)
			.then(function(rows){
				return (rows.length === 1);
			});
	}


	deleteEntity(id) {
		return this.db(this.schema.slug).where('_id', id).limit(1).delete()
			.then(function(affected){
				return (affected === 1);
			});
	}


	_generateQuery(params) {

		var query = this.db(this.schema.slug);

		query.orderBy('_created', 'desc');

		query.limit(params.limit);

		var ids = params.ids;
		if(ids.length !== 0) {
			query.whereIn('_id', ids);
		}

		return query;

	}


}


module.exports = Repository;
