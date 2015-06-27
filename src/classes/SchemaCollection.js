var _ = require('lodash');
var Promise = require('bluebird');
var Schema = require('./Schema');


class SchemaCollection {


	constructor(db, types) {
		this.db = db;
		this.types = types;
		this.schemas = null;
	}


	getSchemas() {

		var deferred = Promise.defer();

		if(this.schemas !== null) {
			deferred.resolve(this.schemas);
		} else {
			return this._loadSchemas();
		}

		return deferred.promise;

	}


	getSchema(slug) {

		return this.getSchemas()
			.then(function(schemas){
				return (slug in schemas) ? schemas[slug] : null;
			});

	}


	_loadSchemas() {

		return Promise.all([
			this.db('_schemas').select(),
			this.db('_fields').select(),
			this.db('_types').select()
		])
		.spread(function(db_schemas, db_fields, db_types){

			var types = {};
			_.forEach(db_types, function(db_type){
				types[db_type.id] = db_type;
			});

			var schemas = {};
			var schema_map = {};

			_.forEach(db_schemas, function(db_schema){
				schemas[db_schema.slug] = this._makeSchema(db_schema);
				schema_map[db_schema.id] = db_schema.slug;
			}, this);

			_.forEach(db_fields, function(db_field){
				var type = types[db_field.type_id].slug;
				var field = this.types.makeField(type, db_field);
				var schema_slug = schema_map[db_field.schema_id];
				schemas[schema_slug].addField(field);

			}, this);

			return this.schemas = schemas;

		}.bind(this));

	}


	_makeSchema(db_schema) {

		var schema = new Schema(this.db, db_schema);

		schema.addField(
			this.types.makeField('id', { slug: '_id', opts: { primary: true } })
		);

		schema.addField(
			this.types.makeField('datetime', { slug: '_created', opts: { auto_insert: true } })
		);

		schema.addField(
			this.types.makeField('datetime', { slug: '_updated', opts: { auto_update: true } })
		);

		return schema;

	}


}


module.exports = SchemaCollection;
