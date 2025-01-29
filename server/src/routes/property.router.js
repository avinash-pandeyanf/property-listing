const router = require("express").Router();
const propertyController = require("../controllers/property/property.controller.js");
const { verifyJWT } = require("../middleware/auth.middleware.js");

// Public routes
router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getProperty);

// Protected routes
router.post("/", verifyJWT, propertyController.createProperty);
router.put("/:id", verifyJWT, propertyController.updateProperty);
router.delete("/:id", verifyJWT, propertyController.deleteProperty);

module.exports = router;
