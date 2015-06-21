var BaseField = require('./BaseField');


class VarcharField extends BaseField {


	getUpdateValue(input, entity, keyExists) {

		if(!keyExists || this.protected) {
			return { skip: true };
		}

		var value = input[this.key];

		if(typeof value !== 'string') {
			return { error: 'string' };
		}

		return { value: value + '' };

	}


}


module.exports = VarcharField;
