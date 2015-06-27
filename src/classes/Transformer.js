var _ = require('lodash');
var Promise = require('bluebird');


class Transformer {


	constructor(schema) {
		this.schema = schema;
	}


	entity(row) {

		var output = {};

		output._schema = this.schema.slug;

		_.forEach(this.schema.getFields(), function(field){
			output[field.slug] = field.transform(row);
		});

		return Promise.props(output);

	}


	collection(rows) {

		var output = [];

		_.forEach(rows, function(row){
			output.push(this.entity(row));
		}, this);

		return Promise.all(output);

	}


}


module.exports = Transformer;
