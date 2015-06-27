var _ = require('lodash');
var Promise = require('bluebird');


class BaseField {


	constructor(data) {
		this.slug = data.slug;
		if(_.isObject(data.opts)) {
			this.opts = data.opts;
		} else {
			this.opts = data.opts ? JSON.parse(data.opts) : {};
		}
	}


	transform(entity) {
		return entity[this.slug];
	}


	parseForCreate(input) {

		var deferred = Promise.defer();

		if(this.slug.charAt(0) === '_') {
			deferred.resolve(null);
		} else if(this.slug in input) {
			deferred.resolve({ value: input[this.slug] });
		} else {
			deferred.resolve(null);
		}

		return deferred.promise;

	}


	parseForUpdate(input) {

		if(this.slug.charAt(0) === '_') {
			return { skip: true };
		}

		if(this.slug in input) {
			return { value: input[this.slug] };
		}

		return { skip: true };

	}


}


module.exports = BaseField;
