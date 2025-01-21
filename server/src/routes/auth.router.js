const { handleLogin } = require("../controllers/auth/login.controller.js");
const {
    handlePasswordReset,
} = require("../controllers/auth/passwordReset.controller.js");
const { handleSignup } = require("../controllers/auth/signup.controller.js");

const authRouter = require("express").Router();

authRouter.post("/signup", handleSignup);
authRouter.post("/login", handleLogin);
authRouter.post("/forget-password", handlePasswordReset);

module.exports = authRouter;
