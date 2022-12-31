const Skill = require("../models/skill.model")

module.exports = class SkillController {
	static async getAllSkills() {
		return await Skill.findAll({
			order: [
				["level", "DESC"],
				["name", "ASC"]
			]
		});
	}
	static async getSkillsByLevel(skillLevel) {
		return await Skill.findAll({
			where: {
				level: skillLevel
			}
		});
	}
};