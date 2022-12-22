const Course = require("../models/course.model");

module.exports = class CourseController {
	static async getAllCourses() {
		return await Course.findAll({
			order: [
				["year", "DESC"]
			]
		});
	}
	static async getCourse(searchParameters) {
		return await Course.findOne({
			where: searchParameters
		});
	}
	static async getCourseByName(courseName) {
		return await CourseController.getCourse({
			name: courseName
		});
	}
	static async getLatestCourses() {
		return await Course.findAll({
			order: [
				["year", "DESC"]
			],
			limit: 7
		});
	}
};