const api = require("express").Router();
const authRouter = require("./auth.router.js");
const blogRouter = require("./blog.router.js");
const contactRouter = require("./contact.router.js");

api.use("/auth", authRouter);
api.use("/contact", contactRouter);
api.use("/blog", blogRouter);

module.exports = api;
