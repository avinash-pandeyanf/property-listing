const {
    handleLogin,
    handleSignup,
} = require("../controllers/auth/auth.controller.js");
const {
    handlePasswordReset,
    handlePasswordChange,
    handleChangeProfile,
} = require("../controllers/auth/profile.controller.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");

const authRouter = require("express").Router();

authRouter.post("/signup", handleSignup);
authRouter.post("/login", handleLogin);
authRouter.post("/forget-password", handlePasswordReset);

authRouter.post("/password-change", verifyJWT, handlePasswordChange);
authRouter.post("/profile-change", verifyJWT, handleChangeProfile);

module.exports = authRouter;
