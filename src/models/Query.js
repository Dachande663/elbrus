class Query {


	constructor(schema) {
		this.schema = schema;
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


		// @todo order
		this.order_col = 'created';
		this.order_dir = 'desc';


		this.wheres = [];

		var fields = this.schema.fields;
		var map = this.schema.fieldsMap;

		for(var i = 0, len = map.length; i < len; i++) {
			var field = fields[map[i]];
			var conditions = this.parseField(field, input);
			if(conditions) {
				this.wheres = this.wheres.concat(conditions);
			}
		}


	}


	parseField(field, input) {

		if( ! (field.key in input) ) {
			// @todo default query params
			return null;
		}

		var predicates = input[field.key];
		var wheres = [];

		if(typeof predicates === 'string') {
			predicates = { '$eq' : predicates };
		}

		for(var operator in predicates) {

			var value = predicates[operator];
			var where = this.parseCondition(field, value, operator);

			if(where) {
				wheres.push(where);
			}

		}

		return wheres.length !== 0 ? wheres : null;

	}


	parseCondition(field, value, operator) {

		switch(operator) {

			case '$eq':
				return {
					field: field.key,
					operator: '$eq',
					value: value
				}

			case '$gte':
				return {
					field: field.key,
					operator: '$gte',
					value: value
				}

			case '$lt':
				return {
					field: field.key,
					operator: '$lt',
					value: value
				}

			case '$in':
				return {
					field: field.key,
					operator: '$in',
					value: [value]
				};

		}

		return null;

	}


}


module.exports = Query;
