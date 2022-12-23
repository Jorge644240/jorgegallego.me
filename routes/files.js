const { Router } = require("express");
const { join } = require("path");
const filesGetRequestLimiter = require("../middleware/rateLimit/filesGetRequestLimiter");
const router = Router();

router.get("/robots.txt", filesGetRequestLimiter, (req, res) => {
	res.sendFile(join(__dirname, "..", "robots.txt"));
});

router.get("/sitemap.xml", filesGetRequestLimiter, (req, res) => {
	res.sendFile(join(__dirname, "..", "sitemap.xml"));
});

module.exports = router;