const { ApiError } = require("../utils/ApiError.js");
const { asyncHandler } = require("../utils/asyncHandler.js");
const User = require("../models/user.model.js");
const { decodeAuthToken } = require("../utils/token.js");

const verifyJWT = asyncHandler(async (req, _, next) => {
    const token =
        req.body?.authToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    // TODO: Authenticate using auth token
    const decodedToken = await decodeAuthToken(token);
    const user = await User(decodedToken?._id);
    if (!user) {
        throw new ApiError(401, "Invalid Access Token");
    }

    req.user = {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
    };
    return next();
});

module.exports = { verifyJWT };
