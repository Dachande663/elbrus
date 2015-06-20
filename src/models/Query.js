class Query {


	constructor() {
		this.limit = 10;
		this.offset = 0;
	}


	parse(input) {

		if('limit' in input) {
			this.limit = Math.max(1, Math.abs(input.limit));
		}

		if('offset' in input) {
			this.offset = Math.max(0, Math.abs(input.offset));
		}

	}


}


module.exports = Query;
