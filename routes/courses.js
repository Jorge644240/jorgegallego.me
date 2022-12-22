const { Router } = require("express");
const { getAllCourses } = require("../controllers/course.controller");
const router = Router();

router.get("/", async (req, res) => {
	const courses = await getAllCourses();
	res.render("courses", {
		title: "Courses | Jorge Gallego",
		path: req.originalUrl,
		courses
	});
});

module.exports = router;