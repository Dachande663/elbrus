var FieldTypeCollection = require('../classes/FieldTypeCollection');


var types = new FieldTypeCollection();


types.addType('datetime', require('../classes/Field/DatetimeField'));
types.addType('id', require('../classes/Field/IdField'));
types.addType('integer', require('../classes/Field/IntegerField'));
types.addType('pointer', require('../classes/Field/PointerField'));
types.addType('string', require('../classes/Field/StringField'));


module.exports = types;
