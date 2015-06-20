var Promise = require('bluebird');


class MySQL {


	constructor(db) {
		this.db = db;
	}


	// Get entities
	getEntities(schema, params) {

		var deferred = Promise.defer();

		// @todo query

		var query = this.db
			.select()
			.from(schema.db_table)
			.orderBy('created', 'desc')
			.offset(params.offset)
			.limit(params.limit)
		;

		query
			.then(function(rows){
				// @todo process rows
				deferred.resolve(rows);
			})
			.catch(function(err){
				deferred.reject(err);
			})
		;

		return deferred.promise;

	}


	totalEntities(schema, params) {}


	findEntity(schema, id) {

		var deferred = Promise.defer();

		this.db
			.select()
			.from(schema.db_table)
			.where('id', id)
			.first()
			.then(function(row){
				if(!row) {
					return deferred.reject('Entity not found');
				}
				// @todo process row
				deferred.resolve(row);
			})
			.catch(function(err){
				deferred.reject(err);
			})
		;

		return deferred.promise;

	}


	createEntity(schema, input) {

		var deferred = Promise.defer();
		var data = {};

		// @todo validate

		for(var i = 0, len = schema.fieldsMap.length; i < len; i++) {

			var field = schema.fields[schema.fieldsMap[i]];
			var value = field.parseValue(input);

			data[field.key] = value;

		}

		this.db(schema.db_table)
			.insert(data)
			.then(function(row){
				deferred.resolve(data);
			})
			.catch(function(err){
				deferred.reject(err);
			})
		;

		return deferred.promise;

	}


	updateEntity(schema, entity, input) {

		var deferred = Promise.defer();
		var data = entity;
		var update = {};

		// @todo validate

		for(var i = 0, len = schema.fieldsMap.length; i < len; i++) {

			var field = schema.fields[schema.fieldsMap[i]];

			if( ! (field.key in input) ) {
				continue;
			}

			var value = field.parseValue(input);

			data[field.key] = value;
			update[field.key] = value;

		}

		this.db(schema.db_table)
			.where('id', entity.id)
			.limit(1)
			.update(data)
			.then(function(row){
				deferred.resolve(data);
			})
			.catch(function(err){
				deferred.reject(err);
			})
		;

		return deferred.promise;

	}


	deleteEntity(schema, entity) {

		var deferred = Promise.defer();

		this.db(schema.db_table)
			.where('id', entity.id)
			.del()
			.then(function(){
				deferred.resolve();
			})
			.catch(function(err){
				deferred.reject(err);
			})
		;

		return deferred.promise;

	}


}


module.exports = MySQL;
