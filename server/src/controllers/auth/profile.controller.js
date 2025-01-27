const { asyncHandler } = require("../../utils/asyncHandler.js");
const User = require("../../models/user.model.js");
const { ApiError } = require("../../utils/ApiError.js");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const bcrypt = require("bcrypt");

const handlePasswordChange = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = req.user;
    if (!user) {
        throw new ApiError(400, "Unauthorized Request!");
    }

    const userData = await User.findOne({ email: user.email });
    if (!userData || !(await userData.isPasswordCorrect(oldPassword))) {
        throw new ApiError(400, "Invalid old password!");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.updateOne(
        { _id: userData._id },
        { password: hashedNewPassword }
    );

    return res
        .status(200)
        .send(
            new ApiResponse(
                200,
                { email: user.email },
                "Password updated successfully. Please log in again with your new password."
            )
        );
});

// TODO: Setup password reset with email
const handlePasswordReset = asyncHandler(async (req, res) => {});

const handleChangeProfile = asyncHandler(async (req, res) => {});

module.exports = {
    handlePasswordReset,
    handlePasswordChange,
    handleChangeProfile,
};
