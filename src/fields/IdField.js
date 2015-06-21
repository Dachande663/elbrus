var BaseField = require('./BaseField');
var crypto = require('crypto');


var id_length = 16;


function generateUniqueId() {
	return crypto.randomBytes(8).toString('hex').slice(0, id_length);
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


	getUpdateValue(input, entity, keyExists) {

		if(this.protected === true) {
			return { skip: true };
		}

		if(!keyExists) {
			return { skip: true };
		}

		var value = input[this.key];

		if(typeof value !== 'string' || value.length !== id_length) {
			return { error: 'format' };
		}

		return { value: value };

	}


}


module.exports = IdField;
