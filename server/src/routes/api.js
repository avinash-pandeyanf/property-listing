const api = require("express").Router();
const authRouter = require("./auth.router.js");
const contactRouter = require("./contact.router.js");

api.use("/auth", authRouter);
api.use("/contact", contactRouter);

module.exports = api;
