var Fields = require('./fields');
var Schema = require('./models/Schema');
var SchemaCollection = require('./models/SchemaCollection');


var db = require('./db');
var schemas = new SchemaCollection();


schemas.addSchema(
	new Schema('pets', db)
		.addField(new Fields.IdField('id'))
		.addField(new Fields.VarcharField('name'))
		.addField(new Fields.IntegerField('age'))
		.addField(new Fields.DatetimeField('created'))
		.addField(new Fields.DatetimeField('updated'))
);


schemas.addSchema(
	new Schema('weights', db)
		.addField(new Fields.IdField('id'))
		.addField(new Fields.IntegerField('weight'))
		.addField(new Fields.DatetimeField('taken'))
		.addField(new Fields.DatetimeField('created'))
		.addField(new Fields.DatetimeField('updated'))
);


module.exports = schemas;
