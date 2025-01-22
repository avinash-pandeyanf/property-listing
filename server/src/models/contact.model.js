const { model, Schema } = require("mongoose");

const ContactSchema = new Schema({
    topic: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Contact = model("Contact", ContactSchema);

module.exports = Contact;
