var SchemaCollection = require('../classes/SchemaCollection');

var db = require('./db');
var types = require('./types');
var schemas = new SchemaCollection(db, types);


module.exports = schemas;
