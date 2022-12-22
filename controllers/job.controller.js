const Job = require("../models/job.model");

module.exports = class JobController {
	static async getAllJobs() {
		return await Job.findAll({
			order: [
				["startDate", "DESC"]
			]
		});
	}
	static async getJob(searchParameters) {
		return await Job.findOne({
			where: searchParameters
		});
	}
	static async getJobs(searchParameters) {
		return await Job.findAll({
			where: searchParameters
		});
	}
	static async getJobsByTitle(jobTitle) {
		return await JobController.getJobs({
			title: jobTitle,
			order: [
				["startDate", "DESC"]
			]
		});
	}
	static async getJobsByCompany(companyName) {
		return await JobController.getJobs({
			company: companyName,
			order: [
				["startDate", "DESC"]
			]
		});
	}
	static async getJobByCompanyAndTitle(companyName, jobTitle) {
		return await JobController.getJob({
			company: companyName,
			title: jobTitle
		});
	}
	static async getLatestJobs() {
		return await Job.findAll({
			order: [
				["startDate", "DESC"]
			],
			limit: 3
		});
	}
};