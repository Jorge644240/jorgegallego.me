const { Router } = require("express");
const { renderFile } = require("pug");
const { EmailVerifier } = require("simple-email-verifier");
const path = require("path");
const { createContact } = require("../controllers/contact.controller");
const fnSendMail = require("../data/fn/fnSendMail");
const contactFormPostRequestLimiter = require("../middleware/rateLimit/contactFormPostRequestLimiter");
const router = Router();

router.get("/", (req, res) => {
	const cookies = req.cookies;
	res.clearCookie("contactFormError");
	res.clearCookie("contactFormMessage");
	res.render("contact", {
		title: "Contact Me | Jorge Gallego",
		error: cookies.contactFormError,
		message: cookies.contactFormMessage
	});
});

router.post("/", contactFormPostRequestLimiter, (req, res) => {
	const { email } = req.body;
	new EmailVerifier(10000).verify(email)
	.then(isEmailValid => {
		if (!isEmailValid) res.cookie("contactFormError", "Entered email is invalid", {
			httpOnly: true,
			secure: true
		});
		else if (isEmailValid) {
			createContact({
				name: req.body.name,
				email,
				service: req.body.service,
				message: req.body.message
			});
			const contactFormSubmissionResponseMailOptions = {
				from: `"Jorge Gallego" ${process.env.EMAIL_USERNAME}`,
				to: `"${req.body.name}" ${email}`,
				subject: "Thanks for your interest | Jorge Gallego",
				html: renderFile(path.join(__dirname, "..", "views", "emails", "contactFormSubmissionResponse.pug"), {
					name: req.body.name,
					email,
					service: req.body.service,
					message: req.body.message
				})
			};
			const contactFormSubmissionNotificationMailOptions = {
				from: process.env.EMAIL_USERNAME,
				to: process.env.EMAIL_USERNAME,
				subject: "New Contact Submission",
				html: renderFile(path.join(__dirname, "..", "views", "emails", "contactFormSubmissionNotification.pug"), {
					name: req.body.name,
					email,
					service: req.body.service,
					message: req.body.message
				})
			};
			fnSendMail(contactFormSubmissionResponseMailOptions);
			fnSendMail(contactFormSubmissionNotificationMailOptions);
			res.cookie("contactFormMessage", "I've received your information, and will get back to you soon", {
				httpOnly: true,
				secure: true
			});
		}
	})
	.catch(err => {
		res.cookie("contactFormError", "There has been an issue. Please try again", {
			httpOnly: true,
			secure: true
		});
	})
	.finally(() => {
		res.redirect("/contact");
	});
});

module.exports = router;