const { Router } = require("express");
const CourseController = require("../controllers/course.controller");
const JobController = require("../controllers/job.controller");
const ProjectController = require("../controllers/project.controller");
const router = Router();

router.get("/", async (req, res) => {
	const projects = await ProjectController.getFeaturedProjects(),
		jobs = await JobController.getLatestJobs(),
		courses = await CourseController.getLatestCourses();
	res.render("index", {
		title: "Jorge Gallego - Full Stack Web Engineer",
		path: req.originalUrl,
		projects,
		jobs, 
		courses
	});
});

module.exports = router;