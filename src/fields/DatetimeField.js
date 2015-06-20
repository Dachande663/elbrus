var BaseField = require('./BaseField');
var moment = require('moment');


class DatetimeField extends BaseField {

	parseValue(body) {
		return (this.key in body) ? body[this.key] : moment().format('YYYY-MM-DD HH:mm:ss');
	}

}


module.exports = DatetimeField;
