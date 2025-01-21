const api = require("express").Router();
const authRouter = require("./auth.router.js");

api.use("/auth", authRouter);

module.exports = api;
