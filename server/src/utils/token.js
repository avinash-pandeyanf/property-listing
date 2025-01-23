const jwt = require("jsonwebtoken");

async function decodeAuthToken(token) {
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded;
    } catch (error) {
        if (err.name !== "TokenExpiredError") {
            console.error(err);
        }
        return null;
    }
}

module.exports = { decodeAuthToken };
