const { Router } = require("express");
const { join } = require("path");
const filesGetRequestLimiter = require("../middleware/rateLimit/filesGetRequestLimiter");
const router = Router();

router.use(filesGetRequestLimiter);

router.get("/robots.txt", (req, res) => {
	res.sendFile(join(__dirname, "..", "robots.txt"));
});

router.get("/sitemap.xml", (req, res) => {
	res.sendFile(join(__dirname, "..", "sitemap.xml"));
});

module.exports = router;