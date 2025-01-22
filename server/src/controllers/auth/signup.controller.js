const { asyncHandler } = require("../../utils/asyncHandler.js");
const User = require("../../models/user.model.js");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const { ApiError } = require("../../utils/ApiError.js");

const handleSignup = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        selectRole,
        yourFirstSchool,
    } = req.body;

    if (
        [
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            selectRole,
            yourFirstSchool,
        ].some((item) => !item)
    ) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        selectRole,
        yourFirstSchool,
    });

    if (!user) {
        throw new ApiError(400, "Failed to create user");
    }

    const authToken = await user.generateAuthToken();

    return res.status(201).send(
        new ApiResponse(
            201,
            {
                firstName,
                lastName,
                email,
                phoneNumber,
                selectRole,
                authToken,
            },
            "User Created Successfully!"
        )
    );
});

module.exports = { handleSignup };
