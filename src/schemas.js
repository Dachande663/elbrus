var Fields = require('./fields');
var Schema = require('./models/Schema');
var SchemaCollection = require('./models/SchemaCollection');


var db = require('./db');
var KnexDatasource = require('./datasources/KnexDatasource');
var datasource = new KnexDatasource(db);


var schemas = new SchemaCollection();


// @todo load schemas from db


schemas.addSchema(
	new Schema('pet', { db: datasource })
		.addField(new Fields.IdField('id', { protected: true }))
		.addField(new Fields.VarcharField('name', { required: true }))
		.addField(new Fields.IntegerField('age'))
		.addField(new Fields.DatetimeField('created', { protected: true, auto_insert: true }))
		.addField(new Fields.DatetimeField('updated', { protected: true, auto_update: true }))
);


schemas.addSchema(
	new Schema('weight', { db: datasource })
		.addField(new Fields.IdField('id', { protected: true, auto: true }))
		.addField(new Fields.IntegerField('weight', { required: true }))
		.addField(new Fields.DatetimeField('taken', { auto_insert: true }))
		.addField(new Fields.DatetimeField('created', { protected: true, auto_insert: true }))
		.addField(new Fields.DatetimeField('updated', { protected: true, auto_update: true }))
);


module.exports = schemas;
