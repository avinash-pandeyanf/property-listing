const router = require("express").Router();
const {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
} = require("../controllers/property/property.controller.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");

// Public routes
router.get("/", getProperties);
router.get("/:id", getProperty);

// Protected routes
router.post("/", verifyJWT, createProperty);
router.put("/:id", verifyJWT, updateProperty);
router.delete("/:id", verifyJWT, deleteProperty);

module.exports = router;
