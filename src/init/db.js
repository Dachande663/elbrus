var Knex = require('knex');


module.exports = Knex({
	client: 'mysql2',
	connection: {
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST || 'localhost'
	}
});
