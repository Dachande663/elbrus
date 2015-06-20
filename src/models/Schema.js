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
	createEntity(data) {
		return this.db.createEntity(this, data);
	}


	// Update an entity
	updateEntity(entity, data) {
		return this.db.updateEntity(this, entity, data);
	}


	// Delete an entity
	deleteEntity(entity) {
		return this.db.deleteEntity(this, entity);
	}


}


module.exports = Schema;
