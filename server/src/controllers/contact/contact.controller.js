const { asyncHandler } = require("../../utils/asyncHandler.js");
const { ApiError } = require("../../utils/ApiError.js");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const Contact = require("../../models/contact.model.js");

const createContactRequest = asyncHandler(async (req, res) => {
    const { topic, name, email, message } = req.body;

    if ([topic, name, email, message].some((item) => !item)) {
        throw new ApiError(400, "Please provide all required fields!");
    }

    const contact = await Contact.create({ topic, name, email, message });
    if (!contact) {
        throw new ApiError(500, "Failed to create contact.");
    }

    return res
        .status(201)
        .send(new ApiResponse(201, contact, "Your contact has been created."));
});

module.exports = { createContactRequest };
