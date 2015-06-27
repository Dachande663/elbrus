var BaseField = require('./BaseField');
var Moment = require('moment');


class DatetimeField extends BaseField {


	transform(entity) {
		return Moment(entity[this.slug]).format('YYYY-MM-DD HH:mm:ss');
	}


	parseForCreate(input) {

		if(this.slug.charAt(0) === '_') {
			if(this.opts.auto_insert || this.opts.auto_update) {
				return { value: Moment().format('YYYY-MM-DD HH:mm:ss') };
			}
		}

		return super.parseForCreate(input);

	}


	parseForUpdate(input) {

		if(this.slug.charAt(0) === '_') {
			if(this.opts.auto_update) {
				return { value: Moment().format('YYYY-MM-DD HH:mm:ss') };
			}
		}

		return super.parseForUpdate(input);

	}


}


module.exports = DatetimeField;
