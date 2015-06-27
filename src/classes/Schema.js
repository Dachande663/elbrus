var Parser = require('./Parser');
var Repository = require('./Repository');
var Transformer = require('./Transformer');


class Schema {


	constructor(db, data) {
		this.parser = new Parser(this);
		this.repository = new Repository(db, this);
		this.transformer = new Transformer(this);
		this.slug = data.slug;

		this.fields = {};

	}


	addField(field) {
		this.fields[field.slug] = field;
	}


	getFields() {
		return this.fields;
	}


	getField(slug) {
		return (slug in this.fields) ? this.fields[slug] : null;
	}


}


module.exports = Schema;
