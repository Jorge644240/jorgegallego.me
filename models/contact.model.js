const { DataTypes, Model } = require("sequelize");
const connection = require("../data/aws/dbConnection");

class Contact extends Model {};

Contact.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		unique: true,
		autoIncrement: true,
		validate: {
			isInt: true,
			notEmpty: true
		},
		set(value) {
			if (this.getDataValue("id") && this.getDataValue("id")!==value) throw new Error("Cannot set Contact ID after creation");
			else this.setDataValue("id", value);
		}
	},
	name: {
		type: DataTypes.STRING(150),
		allowNull: false,
		validate: {
			notEmpty: true
		},
		set(newContactName) {
			this.setDataValue("name", newContactName);
		}
	},
	email: {
		type: DataTypes.STRING(300),
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true,
			isEmail: true
		},
		set(value) {
			if (this.getDataValue("email") && this.getDataValue("email")!==value) throw new Error("Cannot set Contact Email after creation");
			else this.setDataValue("email", value);
		}
	},
	service: {
		type: DataTypes.ENUM({
			values: ["Front End", "Back End", "Full Stack", "Consultancy"]
		}),
		allowNull: false,
		validate: {
			notEmpty: true
		},
		set(newContactService) {
			this.setDataValue("service", newContactService);
		}
	},
	message: {
		type: DataTypes.STRING(1000),
		allowNull: true,
		validate: {
			notEmpty: true
		},
		set(newContactMessage) {
			this.setDataValue("message", newContactMessage);
		}
	}
}, {
	sequelize: connection,
	tableName: "contacts",
	modelName: "Contact",
	createdAt: false,
	updatedAt: false
});

module.exports = Contact;