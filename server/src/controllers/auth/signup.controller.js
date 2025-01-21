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
        return ApiError(400, "Please provide all required fields");
    }

    const user = await User.create(
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        selectRole,
        yourFirstSchool
    );

    // TODO: Token response
    return ApiResponse(
        201,
        {
            firstName,
            lastName,
            email,
            phoneNumber,
            selectRole,
        },
        "User Created Successfully!"
    );
});

module.exports = { handleSignup };
