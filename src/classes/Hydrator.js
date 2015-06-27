var _ = require('lodash');
var Promise = require('bluebird');
var PointerField = require('./Field/PointerField');
var QueryParams = require('./QueryParams');


class Hydrator {


	constructor(schemas) {
		this.schemas = schemas;
	}


	hydrateRow(schema, row) {

		return this.hydrateRows(schema, [row])
			.then(function(rows){
				return rows[0];
			});

	}


	hydrateRows(schema, rows) {

		var relations = this._extractRelationFields(schema.getFields());

		if(relations.length === 0) {
			var deferred = Promise.defer();
			deferred.resolve(rows);
			return deferred.promise;
		}

		var schema_ids = this._extractRelatedIdsBySchema(rows, relations);

		if(!schema_ids) {
			var deferred = Promise.defer();
			deferred.resolve(rows);
			return deferred.promise;
		}

		return this._hydrateEntities(rows, schema_ids);

	}


	_extractRelationFields(fields) {

		var relations = {};

		_.forEach(fields, function(field){

			if( ! (field instanceof PointerField) ) {
				return;
			}

			relations[field.slug] = {
				field: field.slug,
				schema: field.opts.schema
			};

		});

		return relations;

	}


	_extractRelatedIdsBySchema(rows, relations) {

		var schemas = {};
		var found = false;

		_.forEach(rows, function(row, i){
			_.forEach(relations, function(relation){

				var id = row[relation.field];

				if(!id) {
					return;
				}

				var schema = relation.schema;

				if( ! (schema in schemas) ) {
					schemas[schema] = {};
				}

				if( ! (id in schemas[schema]) ) {
					schemas[schema][id] = [];
				}

				found = true;
				schemas[schema][id].push({ row: i, field: relation.field });

			});
		});

		return found ? schemas : null;

	}


	_hydrateEntities(rows, schema_ids) {

		var output = rows;

		var promises = _.map(schema_ids, function(ids, slug){

			return this._getEntitiesByIds(slug, ids)
				.then(function(rel_rows){
					_.forEach(rel_rows, function(rel_entity){
						_.forEach(schema_ids[slug][rel_entity._id], function(schema_row){
							output[schema_row.row][schema_row.field] = rel_entity;
						});
					});
					return output;
				});

		}, this);

		return Promise.all(promises).then(function(){
			return output;
		});

	}


	_getEntitiesByIds(slug, ids) {

		return this.schemas.getSchema(slug).then(function(schema){
			var params = new QueryParams(schema);
			params.setIds(_.keys(ids));
			return schema.repository.getEntities(params);
		});

	}


}


module.exports = Hydrator;
