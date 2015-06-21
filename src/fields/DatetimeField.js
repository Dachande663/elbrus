var BaseField = require('./BaseField');
var moment = require('moment');


class DatetimeField extends BaseField {


	constructor(key, opts) {

		super(key, opts);

		var opts = opts || {};

		this.auto_insert = ('auto_insert' in opts) ? !!opts.auto_insert : false;
		this.auto_update = ('auto_update' in opts) ? !!opts.auto_update : false;

	}


	getValueFromInput(input, entity) {

		if(this.protected === true) {

			if(entity === null) {

				if(this.auto_insert || this.auto_update) {
					return { value: moment().toISOString() };
				}

			} else {

				if(this.auto_update) {
					return { value: moment().toISOString() };
				}

			}

			return { skip: true };

		}

		return super.getValueFromInput(input, entity);

	}


	getCreateValue() {

		if(this.auto_insert === true || this.auto_update === true) {
			return { value: moment().toISOString() };
		}

		return super.getCreateValue();

	}


	getUpdateValue(input, entity, keyExists) {

		if(keyExists) {
			return this._parseInput(input[input.key]);
		}

		if(this.auto_update === true) {
			return { value: moment().toISOString() };
		}

		return { skip: true };

	}


	_parseInput(value) {

		var value = moment(value);

		if(!value.isValid()) {
			return { error: 'format' };
		}

		return { value: value.toISOString() };

	}


}


module.exports = DatetimeField;
