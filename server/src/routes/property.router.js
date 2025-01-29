const router = require("express").Router();
const propertyController = require("../controllers/property/property.controller");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getProperty);

// Protected routes
router.post("/", protect, propertyController.createProperty);
router.put("/:id", protect, propertyController.updateProperty);
router.delete("/:id", protect, propertyController.deleteProperty);

module.exports = router;
