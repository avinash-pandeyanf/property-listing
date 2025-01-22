const User = require("../../models/user.model.js");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const { asyncHandler } = require("../../utils/asyncHandler.js");
const { ApiError } = require("../../utils/ApiError.js");

const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Please provide email and password");
    }

    const user = await User.findOne({ email }).exec();
    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid email or password");
    }

    const authToken = await user.generateAuthToken();

    return res
        .status(200)
        .send(
            new ApiResponse(
                200,
                { email, authToken },
                "Authentication Successfully!"
            )
        );
});

module.exports = { handleLogin };
