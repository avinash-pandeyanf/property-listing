const blogRouter = require("express").Router();
const {
    createNewBlog,
    getAllBlogsCreatedByAdmin,
    getOneBlogById,
    getAllBlogs,
} = require("../controllers/blog/blog.controller.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");

// Admin
blogRouter.post("/new", verifyJWT, createNewBlog);
blogRouter.get("/admin/all", verifyJWT, getAllBlogsCreatedByAdmin);
// Public
blogRouter.get("/:id", getOneBlogById);
blogRouter.get("/", getAllBlogs);

module.exports = blogRouter;
