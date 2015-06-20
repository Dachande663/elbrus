var Fields = require('./fields');
var KnexDatasource = require('./datasources/KnexDatasource');
var Schema = require('./models/Schema');
var SchemaCollection = require('./models/SchemaCollection');


var schemas = new SchemaCollection();


// @todo load schemas from db


schemas.addSchema(
	new Schema('pet', { db: KnexDatasource })
		.addField(new Fields.IdField('id'))
		.addField(new Fields.VarcharField('name'))
		.addField(new Fields.IntegerField('age'))
		.addField(new Fields.DatetimeField('created'))
		.addField(new Fields.DatetimeField('updated'))
);


schemas.addSchema(
	new Schema('weight', { db: KnexDatasource })
		.addField(new Fields.IdField('id'))
		.addField(new Fields.IntegerField('weight'))
		.addField(new Fields.DatetimeField('taken'))
		.addField(new Fields.DatetimeField('created'))
		.addField(new Fields.DatetimeField('updated'))
);


module.exports = schemas;
