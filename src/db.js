var mysql = require('mysql2');


var connection = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
};


if(process.env.DB_SOCKET) {
	connection.socketPath = process.env.DB_SOCKET;
} else {
	connection.host = process.env.DB_HOST;
}


module.exports = mysql.createConnection(connection);
