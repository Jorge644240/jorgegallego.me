const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
	max: 1,
	windowMs: 3600000,
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req, res) => {
		res.redirect("/contacto");
	}
});