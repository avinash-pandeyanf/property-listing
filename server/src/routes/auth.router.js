const {
    handleLogin,
    handleSignup,
} = require("../controllers/auth/auth.controller.js");
const {
    handlePasswordChange,
    handleProfileUpdate,
    handlePasswordResetRequest,
    validatePasswordReset,
    handleNewPasswordAfterValidation,
} = require("../controllers/auth/profile.controller.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");

const authRouter = require("express").Router();

authRouter.post("/signup", handleSignup);
authRouter.post("/login", handleLogin);

authRouter.post("/password/forgot", handlePasswordResetRequest);
authRouter.post("/password/validate", validatePasswordReset);
authRouter.post("/password/create", handleNewPasswordAfterValidation);

authRouter.post("/update/password", verifyJWT, handlePasswordChange);
authRouter.post("/update/profile", verifyJWT, handleProfileUpdate);

module.exports = authRouter;
