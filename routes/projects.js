const { Router } = require("express");
const { getAllProjects } = require("../controllers/project.controller");
const router = Router();

router.get("/", async (req, res) => {
	const projects = await getAllProjects();
	res.render("projects", {
		title: "Projects | Jorge Gallego",
		path: req.originalUrl,
		projects
	});
});

module.exports = router;