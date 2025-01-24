const { asyncHandler } = require("../../utils/asyncHandler.js");
const { ApiError } = require("../../utils/ApiError.js");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const Blog = require("../../models/blog.model.js");

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, content, tags, image } = req.body;
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "Unauthorized Request!");
    }

    if ([title, content, tags].some((item) => !item)) {
        throw new ApiError(400, "Please provide all required fields!");
    }

    const blog = await Blog.create({
        title,
        author: user._id,
        content,
        tags,
        image,
    });
    if (!blog) {
        throw new ApiError(500, "Failed to create blog.");
    }

    return res
        .status(201)
        .send(new ApiResponse(201, blog, "Blog has been created."));
});

const getAllBlogsCreatedByAdmin = asyncHandler(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }
    const blogs = await Blog.find({ author: user._id });
    return res
        .status(200)
        .send(
            new ApiResponse(200, blogs, "All user blogs accessed successfully.")
        );
});

const getOneBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new ApiError(404, "Blog not found.");
    }
    return res
        .status(200)
        .send(new ApiResponse(200, blog, "Blog accessed successfully"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res
        .status(200)
        .send(new ApiResponse(200, blogs, "All blogs accessed successfully."));
});

const updateBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, tags, image } = req.body;

    if (!req.body) {
        throw new ApiError(400, "Please provide changes to update!");
    }

    const blog = await Blog.findOneAndUpdate(
        { _id: id, author: req.user._id },
        { title, content, tags, image }
        // { new: true }
    );
    if (!blog) {
        throw new ApiError(404, "Blog not found.");
    }

    return res
        .status(200)
        .send(new ApiResponse(200, blog, "Blog updated successfully."));
});

const deleteBlogById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Invalid blog request.");
    }

    const blog = await Blog.deleteOne({
        _id: id,
        author: req.user._id,
    }).exec();

    if (!blog) {
        throw new ApiError(404, "Blog not found.");
    }

    return res
        .status(200)
        .send(new ApiResponse(200, blog, "Blog deleted successfully."));
});

module.exports = {
    createNewBlog,
    getAllBlogsCreatedByAdmin,
    getOneBlogById,
    getAllBlogs,
    updateBlogById,
    deleteBlogById,
};
