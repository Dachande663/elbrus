var Promise = require('bluebird');
var Query = require('./Query');


// A Schema is a grouping of fields
class Schema {


	// Constructor
	constructor(key, opts) {

		this.key = key;
		this.url_slug = this.key + 's';

		this.name_singular = this.key;
		this.name_plural = this.key + 's';

		this.db = opts.db;
		this.db_table = this.key + 's';

		this.fields = {};
		this.fieldsMap = [];

	}


	// Add a field definition to this schema
	addField(field) {
		this.fields[field.key] = field;
		this.fieldsMap.push(field.key);
		return this;
	}


	// Get entities
	getEntities(input) {
		var query = new Query();
		query.parse(input);
		return this.db.getEntities(this, query);
	}


	// Get total number of entities
	totalEntities(params) {
		var params = this._generateParams(input);
		return this.db.totalEntities(this, params);
	}


	// Get a single entity
	findEntity(id) {
		return this.db.findEntity(this, id);
	}


	// Create an entity
	createEntity(input) {

		var self = this;

		return this._parseEntity(input, null)
			.then(function(data){
				return self.db.createEntity(self, data);
			});

	}


	// Update an entity
	updateEntity(entity, input) {

		var self = this;

		return this._parseEntity(input, entity)
			.then(function(data){
				return self.db.updateEntity(self, entity, data);
			});

	}


	// Delete an entity
	deleteEntity(entity) {
		return this.db.deleteEntity(this, entity);
	}


	// Parse input data into a valid entity
	_parseEntity(input, entity) {

		var deferred = Promise.defer();
		var fields = this.fields;
		var map = this.fieldsMap;

		var data = {};
		var errors = {};
		var hasErrors = false;

		for(var i = 0, len = map.length; i < len; i++) {

			var field = fields[map[i]];

			var result = field.getValueFromInput(input, entity);

			if('value' in result) {
				data[field.key] = result.value;
			} else if('error' in result && result.error !== null) {
				errors[field.key] = result.error;
				hasErrors = true;
			} else if('skip' in result && result.skip === true) {
				continue;
			}

		}

		if(hasErrors) {
			deferred.reject(errors);
		} else {
			deferred.resolve(data);
		}

		return deferred.promise;

	}


}


module.exports = Schema;
