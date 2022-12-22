const { DataTypes, Model } = require("sequelize");
const connection = require("../data/aws/dbConnection");

class Course extends Model {}

Course.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		validate: {
			isInt: true,
			notEmpty: true
		},
		set(value) {
			if (this.getDataValue("id") && this.getDataValue("id")!==value) throw new Error("Cannot set Course ID after creation");
			else this.setDataValue("id", value);
		}
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true,
			len: [5, 100]
		},
		set(newCourseName) {
			this.setDataValue("name", newCourseName);
		}
	}, 
	school: {
		type: DataTypes.STRING(250),
		allowNull: false,
		validate: {
			notEmpty: true
		},
		set(value) {
			if (this.getDataValue("school") && this.getDataValue("school")!==value) throw new Error("Cannot set Course School after creation");
			else this.setDataValue("school", value);
		}
	},
	url: {
		type: DataTypes.STRING(100),
		allowNull: false,
		validate: {
			notEmpty: true,
			isUrl: true
		},
		set(newCourseUrl) {
			this.setDataValue("url", newCourseUrl);
		}
	},
	year: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		defaultValue: new Date().getFullYear(),
		validate: {
			isInt: true
		},
		set(value) {
			if (this.getDataValue("year") && this.getDataValue("year")!==value) throw new Error("Cannot set Course Year after creation");
			else if (value > new Date().getFullYear()) throw new Error("Course Year cannot be greater than current year");
			else this.setDataValue("year", value);
		}
	},
	topic: {
		type: DataTypes.STRING(150),
		allowNull: false,
		defaultValue: "Computer Science",
		set(value) {
			if (this.getDataValue("topic") && this.getDataValue("topic")!==value) throw new Error("Cannot set Course Topic after creation");
			else this.setDataValue("topic", value);
		}
	}
}, {
	sequelize: connection,
	tableName: "courses",
	modelName: "Course",
	createdAt: false,
	updatedAt: false
});

module.exports = Course;