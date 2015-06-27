class FieldTypeCollection {


	constructor() {
		this.types = {};
	}


	addType(slug, type) {
		this.types[slug] = type;
	}


	getTypes() {
		return this.types;
	}


	getType(slug) {
		return (slug in this.types) ? this.types[slug] : null;
	}


	makeField(slug, field_data) {

		var type = this.getType(slug);

		if(!type) {
			return null;
		}

		return new type(field_data);

	}


}


module.exports = FieldTypeCollection;
