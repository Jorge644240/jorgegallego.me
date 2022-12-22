const { DataTypes, Model } = require("sequelize");
const connection = require("../data/aws/dbConnection");

class Skill extends Model {};

Skill.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
		validate: {
			notEmpty: true,
			isInt: true
		},
		set(value) {
			if (this.getDataValue("id") && this.getDataValue("id")!==value) throw new Error("Cannot set Skill ID after creation");
			else this.setDataValue("id", value);
		}
	},
	name: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true
		},
		set(value) {
			if (this.getDataValue("name") && this.getDataValue("name")!==value) throw new Error("Cannot set Skill Name after creation");
			else this.setDataValue("name", value);
		}
	},
	level: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
		validate: {
			notEmpty: true,
			isInt: true
		},
		get() {
			return ["Currently Learning", "Novice", "Experienced", "Advanced", "Expert"][this.getDataValue("level")];
		},
		set(newSkillLevel) {
			this.setDataValue("level", newSkillLevel);
		}
	}
}, {
	sequelize: connection,
	tableName: "skills",
	modelName: "Skill",
	createdAt: false,
	updatedAt: false
});

module.exports = Skill;