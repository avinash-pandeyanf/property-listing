const { model, Schema } = require("mongoose");

// TODO: Verify blog model from figma
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
    },
    // views: {
    //     type: Number,
    //     required: true,
    // },
    // comments: {
    //     type: [Schema.Types.ObjectId],
    //     ref: "Comment",
    // },
});

const Blog = model("Blog", BlogSchema);

module.exports = Blog;
