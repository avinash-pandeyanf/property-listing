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

    const decodedToken = await decodeAuthToken(token);
    req.user = {
        _id: decodedToken._id,
        email: decodedToken.email,
    };
    return next();
});

module.exports = { verifyJWT };
