var Util = require('./Util');
var Promise = require('bluebird');


class QueryParams {


	constructor(schema) {

		this.schema = schema;

		this.has_order = true;
		this.order_col = '_created';
		this.order_dir = 'desc';

		this.has_limit = true;
		this.limit = 10;
		this.offset = 0;

		this.ids = [];

	}


	parseInput(input) {

		var deferred = Promise.defer();

		if('limit' in input) {
			this.setLimit(input.limit);
		}

		deferred.resolve(this);

		return deferred.promise;

	}


	setIds(ids) {
		this.ids = ids;
	}


	setLimit(val) {
		this.limit = Util.between(parseInt(val, 10), 1, 200);
	}


}


module.exports = QueryParams;
