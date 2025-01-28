const api = require("express").Router();
const authRouter = require("./auth.router.js");
const propertyRouter = require("./property.router.js");
const blogRouter = require("./blog.router.js");
const contactRouter = require("./contact.router.js");

api.use("/auth", authRouter);
api.use("/properties", propertyRouter);
api.use("/blog", blogRouter);
api.use("/contact", contactRouter);

module.exports = api;
