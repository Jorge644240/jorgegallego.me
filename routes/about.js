const { Router } = require("express");
const { getAllSkills } = require("../controllers/skill.controller");
const router = Router();

router.get("/", async (req, res) => {
	res.render("about", {
		title: "About Me | Jorge Gallego",
		path: req.originalUrl,
		skills: await getAllSkills()
	});
});

module.exports = router;