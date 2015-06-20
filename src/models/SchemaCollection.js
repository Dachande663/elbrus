var Promise = require('bluebird');


// A collection of schemas
class SchemaCollection {


	// Constructor
	constructor() {
		this.schemas = {};
		this.slugs = {};
	}


	// Register a schema
	addSchema(s) {
		this.schemas[s.key] = s;
		this.slugs[s.url_slug] = s.key;
	}


	// Get all schemas
	getSchemas() {
		var deferred = Promise.defer();
		deferred.resolve(this.schemas);
		return deferred.promise;
	}


	// Get a schema for a given key
	getSchemaByKey(key) {

		var deferred = Promise.defer();

		if(key in this.schemas) {
			deferred.resolve(this.schemas[key]);
		} else {
			deferred.reject('Schema not found');
		}

		return deferred.promise;

	}


	// Get a schema by it's URL slug
	getSchemaByUrlSlug(slug) {

		var deferred = Promise.defer();

		if(slug in this.slugs) {
			deferred.resolve(this.schemas[this.slugs[slug]]);
		} else {
			deferred.reject('Schema not found');
		}

		return deferred.promise;

	}


}


module.exports = SchemaCollection;
