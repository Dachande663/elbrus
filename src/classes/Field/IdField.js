var BaseField = require('./BaseField');
var Crypto = require('crypto');


class IdField extends BaseField {


	parseForCreate(input) {
		// @todo uniqueness
		if(this.opts.primary) {
			return { value: Crypto.randomBytes(8).toString('hex').slice(0, 16) };
		}
	}


}


module.exports = IdField;
