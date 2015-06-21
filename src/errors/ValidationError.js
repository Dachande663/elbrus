var BaseError = require('./BaseError');


class ValidationError extends BaseError {

	constructor(errors) {
		super(errors);
		this.code = 400;
	}


}


module.exports = ValidationError;
