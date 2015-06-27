var BaseField = require('./BaseField');


class PointerField extends BaseField {


	constructor(data) {
		super(data);
		this.schemas = null;
	}


	transform(entity) {

		var val = entity[this.slug];

		if(!val) {
			return null;
		}

		if(this.schemas === null) {
			this.schemas = require('../../init/schemas'); // hack
		}

		return this.schemas.getSchema(this.opts.schema).then(function(schema){
			return schema.transformer.entity(val);
		});

	}


}


module.exports = PointerField;
