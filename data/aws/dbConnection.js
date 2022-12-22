const { Sequelize } = require("sequelize");

const connection = new Sequelize({
	dialect: "mysql",
	host: process.env.RDS_DB_HOST,
	username: process.env.RDS_DB_USERNAME,
	password: process.env.RDS_DB_PASSWORD,
	port: 3306,
	database: process.env.RDS_DB_NAME
});

(async () => {
	await connection.authenticate();
})();

module.exports = connection;