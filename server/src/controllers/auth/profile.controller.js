const { asyncHandler } = require("../../utils/asyncHandler.js");
const User = require("../../models/user.model.js");
const { ApiError } = require("../../utils/ApiError.js");
const { ApiResponse } = require("../../utils/ApiResponse.js");
// const bcrypt = require("bcrypt");
const { Resend } = require("resend");
// const moment = require("moment");
const { randomUUID } = require("node:crypto");

const handlePasswordChange = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email: req.user?.email });
    if (!user || !(await user.isPasswordCorrect(oldPassword))) {
        throw new ApiError(400, "Invalid old password!");
    }

    // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const hashedNewPassword = await user.hashPassword(newPassword);
    const updatedUser = await user.updateOne(
        { _id: user._id },
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

const handleProfileUpdate = asyncHandler(async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
    const user = await User.findOne({ email: req.user?.email });
    if (!user) throw new ApiError(404, "User not found!");

    const updatedUser = await user.updateOne({
        firstName,
        lastName,
        phoneNumber,
    });

    if (!updatedUser)
        throw new ApiError(500, "Something went wrong in updating the user.");

    return res
        .status(200)
        .send(new ApiResponse(200, {}, "Profile updated successfully."));
});

const handlePasswordResetRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found!");

    const generatedToken = randomUUID();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const timestamp = Date.now();
    const CLIENT_URL = process.env.CLIENT_URL;
    const html = `
        <h1>Property Listing</h1>
        <h3>Reset Password</h3>
        <p>
        <a href="${CLIENT_URL}/users/reset?token=${generatedToken}&timestamp=${timestamp}">
        Click Here</a>
        </p>
        <p>
        <a href="${CLIENT_URL}/users/reset?token=${generatedToken}&timestamp=${timestamp}">
        ${CLIENT_URL}/users/reset?token=${generatedToken}&timestamp=${timestamp}</a>
        </p>
        `;

    await resend.emails.send({
        // TODO: Remove this before commit
        // TODO: test mail if not working then use property learning@resend.dev
        from: "Property Listing <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset Your Password",
        html,
    });

    await user.updateOne({ resetToken: generatedToken });
    return res.status(200).send(
        new ApiResponse(
            200,
            {
                email: user.email,
            },
            "Request sent! Check your email."
        )
    );
});

const validatePasswordReset = asyncHandler(async (req, res) => {
    const { token, timestamp } = req.body;
    if (!token || !timestamp) throw new ApiError(500, "Invalid request");

    const isValidTimestamp =
        (Date.now() - timestamp) / 60000 <= 30 ? true : false;

    if (!isValidTimestamp) throw new ApiError(400, "Token Expired!");

    const user = await User.findOne({ resetToken: token });
    if (!user) throw new ApiError(400, "Invalid request");

    await user.updateOne({ resetToken: null });

    return res
        .status(200)
        .send(
            new ApiResponse(
                200,
                { _id: user._id, email: user.email },
                "Validation completed! Please reset the password."
            )
        );
});

const handleNewPasswordAfterValidation = asyncHandler(async (req, res) => {
    const { _id, newPassword } = req.body;
    const user = await User.findOne({ _id });
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const hashedPassword = await user.hashPassword(newPassword);
    await user.updateOne({ password: hashedPassword });
    const authToken = await user.generateAuthToken();

    return res
        .status(200)
        .send(
            new ApiResponse(
                200,
                { authToken, _id: user._id, email: user.email },
                "Password updated successfully!"
            )
        );
});

module.exports = {
    handlePasswordChange,
    handleProfileUpdate,
    handlePasswordResetRequest,
    validatePasswordReset,
    handleNewPasswordAfterValidation,
};
