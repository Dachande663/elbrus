var BaseField = require('./BaseField');


class IntegerField extends BaseField {


	getUpdateValue(input, entity, keyExists) {

		if(!keyExists) {
			return { skip: true };
		}

		var value = parseInt(input[this.key], 10);

		if(isNaN(value) || !isFinite(value)) {
			return { error: 'numeric' };
		}

		return { value: value };

	}


}


module.exports = IntegerField;
