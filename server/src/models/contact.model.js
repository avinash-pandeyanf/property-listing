const { model, Schema } = require("mongoose");

const ContactSchema = new Schema({
    topic: {
        type: Schema.Types.String,
        required: true,
    },
    name: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    message: {
        type: Schema.Types.String,
        required: true,
    },
});

const Contact = model("Contact", ContactSchema);

module.exports = Contact;
