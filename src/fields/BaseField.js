class BaseField {

	constructor(key) {
		this.key = key;
	}

	parseValue(body) {
		return (this.key in body) ? body[this.key] : null;
	}

}

module.exports = BaseField;
