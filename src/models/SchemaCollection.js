class SchemaCollection {

	constructor() {
		this.schemas = {};
	}

	addSchema(s) {
		this.schemas[s.key] = s;
	}

	getSchema(key) {
		return (key in this.schemas) ? this.schemas[key] : null;
	}

}


module.exports = SchemaCollection;
