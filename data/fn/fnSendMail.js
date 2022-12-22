const { createTransport } = require("nodemailer");

module.exports = async (mailOptions) => {
	const transporter = createTransport({
		host: "smtp.titan.email",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD
		}
	});
	await transporter.sendMail(mailOptions);
	transporter.close();
}