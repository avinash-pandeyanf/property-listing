const contactRouter = require("express").Router();
const {
    createContactRequest,
} = require("../controllers/contact/contact.controller.js");

contactRouter.post("/new", createContactRequest);

module.exports = contactRouter;
