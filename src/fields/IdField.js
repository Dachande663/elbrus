var BaseField = require('./BaseField');
var crypto = require('crypto');


function generateUniqueId() {
	return crypto.randomBytes(8).toString('hex').slice(0, 16);
}


class IdField extends BaseField {


	constructor(key, opts) {

		super(key, opts);

		var opts = opts || {};

		this.auto = ('auto' in opts) ? !!opts.auto : false;

	}


	getCreateValue(input) {

		if(this.auto) {
			return { value: generateUniqueId() };
		}

		return { skip: true };

	}


	getUpdateValue(input, entity) {

		if(this.protected === true) {
			return { skip: true };
		}

		if(this.key in input) {
			return { value: input[this.key] };
		}

		return { skip: true };

	}


}


module.exports = IdField;
