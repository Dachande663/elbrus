var BaseField = require('./BaseField');
var crypto = require('crypto');


class IdField extends BaseField {

	parseValue(body) {
		return crypto.randomBytes(8)
			.toString('hex')
			.slice(0, 16);
	}

}


module.exports = IdField;
