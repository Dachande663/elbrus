var BaseField = require('./BaseField');


class VarcharField extends BaseField {


	getUpdateValue(input, entity, keyExists) {

		if(!keyExists || this.protected) {
			return { skip: true };
		}

		if(this.required === true && entity === null && keyExists === false) {
			return { error: 'required' };
		}

		if(this.editable !== true && entity !== null && keyExists === true) {
			return { error: 'uneditable' };
		}

		var value = input[this.key];

		if(typeof value !== 'string') {
			return { error: 'string' };
		}

		return { value: value + '' };

	}


}


module.exports = VarcharField;
