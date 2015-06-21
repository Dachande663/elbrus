class BaseError {

	constructor(errors) {
		this.code = 500;
		this.errors = errors;
	}


	getCode() {

		return this.code;

	}


	getOutput() {

		return {
			status: 'error',
			code: this.code,
			errors: this.errors
		};

	}


}


module.exports = BaseError;
