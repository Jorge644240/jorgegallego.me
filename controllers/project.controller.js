const { Op } = require("sequelize");
const Project = require("../models/project.model");

module.exports = class ProjectController {
	static async getAllProjects() {
		return await Project.findAll();
	}
	static async getProject(searchParameters) {
		return await Project.findOne({
			where: searchParameters
		});
	}
	static async getProjectByName(projectName) {
		return await ProjectController.getProject({
			name: projectName
		});
	}
	static async getFeaturedProjects() {
		return await Project.findAll({
			where: {
				featured: {
					[Op.or]: [true, 1]
				}
			},
			limit: 3
		});
	}
};