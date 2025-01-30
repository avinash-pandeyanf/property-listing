const User = require("../../models/user.model.js");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const { asyncHandler } = require("../../utils/asyncHandler.js");
const { ApiError } = require("../../utils/ApiError.js");
const { uploadOnCloudinary } = require("../../utils/cloudinary.js");

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

    const avatar = await uploadOnCloudinary(req.file?.path);
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        selectRole,
        yourFirstSchool,
        avatar: avatar?.url,
        avatarDisplayId: avatar?.public_id,
    });

    if (!user) {
        throw new ApiError(500, "Failed to create user!");
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
                avatar,
            },
            "User Created Successfully!"
        )
    );
});

module.exports = { handleLogin, handleSignup };
