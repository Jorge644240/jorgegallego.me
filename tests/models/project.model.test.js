const Project = require("./../../models/project.model");

test("Passing no options to Project constructor return empty instance", () => {
	const project = new Project();
	expect(project).toHaveProperty("id", null);
	expect(project).toHaveProperty("name", undefined);
	expect(project).toHaveProperty("description", undefined);
	expect(project).toHaveProperty("url", undefined);
	expect(project).toHaveProperty("image", undefined);
	expect(project).toHaveProperty("featured", false);
});

test("Project name cannot be shorter than 5 characters", () => {
	const project = new Project({
		name: "test",
		description: "test",
		url: "http://google.com",
		image: "https://s3.amazonaws.com/jorgegallego.me/test.jpg"
	});
	project.save()
	.catch(err => {
		expect(err).toHaveProperty("name", "SequelizeValidationError");
		expect(err.message).toMatch(/Validation len on name failed/g);
	});
});

test("Project description cannot be shorter than 50 characters", () => {
	const project = new Project({
		name: "testing",
		description: "testtesttesttesttesttesttesttesttesttesttest",
		url: "http://google.com",
		image: "https://s3.amazonaws.com/jorgegallego.me/test.jpg"
	});
	project.save()
	.catch(err => {
		expect(err).toHaveProperty("name", "SequelizeValidationError");
		expect(err.message).toMatch(/Validation len on description failed/g);
	});
});

test("Project url must be URL string (i.e. 'http://example.com')", () => {
	const project = new Project({
		name: "testing",
		description: "testtesttesttesttesttesttesttesttesttesttest",
		url: "http://google",
		image: "https://s3.amazonaws.com/jorgegallego.me/test.jpg"
	});
	project.save()
	.catch(err => {
		expect(err).toHaveProperty("name", "SequelizeValidationError");
		expect(err.message).toMatch(/Validation isUrl on url failed/g);
	});
});

test("Project image URL must be an AWS S3 object", () => {
	const project = new Project({
		name: "testing",
		description: "testtesttesttesttesttesttesttesttesttesttest",
		url: "http://google.com"
	});
	try {
		project.image = "https://mpconsultores.com/logo.png"
	} catch (err) {
		expect(err).toHaveProperty("message", "Project Image URL must be an AWS S3 object");
	}
});

test("Project image URL must be an AWS S3 object in 'jorgegallego.me' bucket", () => {
	const project = new Project({
		name: "testing",
		description: "testtesttesttesttesttesttesttesttesttesttest",
		url: "http://google.com"
	});
	try {
		project.image = "https://s3.amazonaws.com/jorgegallego/test.png"
	} catch (err) {
		expect(err).toHaveProperty("message", "Project Image URL must be of AWS S3 bucket 'jorgegallego.me'");
	}
});

test("Project Featured Status is set to FALSE by default", () => {
	const project = new Project();
	expect(project).toHaveProperty("featured", false);
});