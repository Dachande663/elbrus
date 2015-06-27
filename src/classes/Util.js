var util = require('util');


class Util {


	static debug(obj) {
		for(var i = 0, len = arguments.length; i < len; i++) {
			console.log(util.inspect(arguments[i], { colors: true, depth: null }));
		}
	}


	static between(val, min, max) {
		return Math.min(max, Math.max(min, val));
	}


}


module.exports = Util;
