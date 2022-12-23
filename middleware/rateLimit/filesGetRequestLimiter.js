const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
	max: 1,
	windowMs: 5000,
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req, res) => {
		res.redirect("/contact");
	}
});