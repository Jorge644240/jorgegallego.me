const ResourceNotFoundError = require("../data/errors/ResourceNotFoundError");
const Contact = require("../models/contact.model")

module.exports = class ContactController {
	static async #createContact(createOptions) {
		const contact = new Contact(createOptions);
		try {
			const result = await contact.save();
			return {
				message: "Contact created successfully",
				contact: result
			};
		} catch (err) {
			return {
				message: "Failed to create Contact",
				error: err.original || err
			};
		};
	}
	static async #updateContact(contactEmail, updateOptions) {
		const contact = await Contact.findOne({
			where: {
				email: contactEmail
			}
		});
		try {
			if (contact === null) throw new ResourceNotFoundError({
				resourceType: "Contact",
				searchParameters: {
					email: contactEmail
				}
			});
			for (const key in updateOptions) contact.setDataValue(key, updateOptions[key]);
			const result = await contact.save();
			return {
				message: "Contact create successfully",
				contact: result
			};
		} catch (err) {
			return {
				message: "Failed to update Contact",
				error: err.original || err
			};
		};
	}
	static async createContact(createOptions) {
		const createResult = await ContactController.#createContact(createOptions);
		if (createResult.error?.name === "SequelizeUniqueConstraintError") {
			const email = createOptions.email;
			delete createOptions.email;
			return await ContactController.#updateContact(email, createOptions);
		} else return createResult;
	}
}