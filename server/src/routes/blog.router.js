const blogRouter = require("express").Router();
const {
    createNewBlog,
    getAllBlogsCreatedByAdmin,
    getOneBlogById,
    getAllBlogs,
    updateBlogById,
    deleteBlogById,
} = require("../controllers/blog/blog.controller.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");
const { upload } = require("../middleware/multer.middleware.js");

// Admin
blogRouter.post("/new", upload.single("image"), verifyJWT, createNewBlog);
blogRouter.get("/admin/all", verifyJWT, getAllBlogsCreatedByAdmin);
blogRouter.post(
    "/update/:id",
    upload.single("image"),
    verifyJWT,
    updateBlogById
);
blogRouter.post("/delete/:id", verifyJWT, deleteBlogById);

// Public
blogRouter.get("/:id", getOneBlogById);
blogRouter.get("/", getAllBlogs);

module.exports = blogRouter;
