const { model, Schema } = require("mongoose");

const BlogSchema = new Schema(
    {
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
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

const Blog = model("Blog", BlogSchema);

module.exports = Blog;
