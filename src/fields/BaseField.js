class BaseField {


	constructor(key, opts) {
		this.key = key;

		var opts = opts|| {};

		this.protected = ('protected' in opts) ? !!opts.protected : false;
		this.editable = ('editable' in opts) ? !!opts.editable : true;
		this.required = ('required' in opts) ? !!opts.required : false;
		this.default = ('default' in opts) ? opts.default : null;

		this.db_column = this.key;
		this.db_index = false;
		// this.db_search = false;
		// this.db_unique = false;

	}


	getValueFromInput(input, entity) {

		var keyExists = (this.key in input);

		if(this.protected === true && entity === null) {
			return this.getCreateValue();
		}

		if(this.protected === true && entity !== null) {
			return this.getUpdateValue(input, entity);
		}

		if(this.required === true && entity === null && keyExists === false) {
			return { error: 'required' };
		}

		if(this.editable !== true && entity !== null && keyExists === true) {
			return { error: 'uneditable' };
		}

		if(entity === null && keyExists === false) {
			return this.getCreateValue();
		}

		return this.getUpdateValue(input, entity);

	}


	getCreateValue(input) {

		return { value: this.default };

	}


	getUpdateValue(input, entity) {

		return { value: input[this.key] };

	}


}

module.exports = BaseField;
