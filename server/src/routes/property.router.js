const router = require("express").Router();
const {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
} = require("../controllers/property/property.controller.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");
const { upload } = require("../middleware/multer.middleware.js");

// Public routes
router.get("/", getProperties);
router.get("/:id", getProperty);

// Protected routes
router.post("/", upload.array("photos", 5), verifyJWT, createProperty);
router.put("/:id", upload.array("photos", 5), verifyJWT, updateProperty);
router.delete("/:id", verifyJWT, deleteProperty);

module.exports = router;
