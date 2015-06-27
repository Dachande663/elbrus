var _ = require('lodash');
var Promise = require('bluebird');


class Parser {


	constructor(schema) {
		this.schema = schema;
	}


	parseForCreate(input) {

		var props = {};

		_.forEach(this.schema.getFields(), function(field, slug){
			props[slug] = field.parseForCreate(input);
		});

		return Promise.props(props)
			.then(function(results){

				var data = {};

				_.forEach(results, function(result, slug){
					if(result.value) {
						data[slug] = result.value;
					}
				});

				return data;

			});

	}


	parseForUpdate(input, entity) {

		var props = {};

		_.forEach(this.schema.getFields(), function(field, slug){
			props[slug] = field.parseForUpdate(input, entity);
		});

		return Promise.props(props)
			.then(function(results){

				var data = {};

				_.forEach(results, function(result, slug){
					if(result.value) {
						data[slug] = result.value;
						entity[slug] = result.value;
					}
				});

				return {
					data: data,
					entity: entity
				};

			});

	}


}


module.exports = Parser;
