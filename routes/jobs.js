const { Router } = require("express");
const { getAllJobs } = require("../controllers/job.controller");
const router = Router();

router.get("/", async (req, res) => {
	const jobs = await getAllJobs();
	res.render("experience", {
		title: "Experience | Jorge Gallego",
		path: req.originalUrl,
		jobs
	});
});

module.exports = router;