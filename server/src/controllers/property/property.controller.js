const Property = require("../../models/property.model");

// Get properties with pagination and sorting
exports.getProperties = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || "date";

        let sortQuery = {};
        switch (sort) {
            case "date":
                sortQuery = { createdAt: -1 };
                break;
            case "cost_low":
                sortQuery = { rent: 1 };
                break;
            case "cost_high":
                sortQuery = { rent: -1 };
                break;
            case "popularity":
                sortQuery = { views: -1 };
                break;
            default:
                sortQuery = { createdAt: -1 };
        }

        const properties = await Property.find()
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        const total = await Property.countDocuments();

        res.json({
            properties,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single property
exports.getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Increment views
        property.views = (property.views || 0) + 1;
        await property.save();

        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create property
exports.createProperty = async (req, res) => {
    try {
        const property = new Property({
            ...req.body,
            owner: req.user._id,
            views: 0
        });
        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update property
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Check if user is the owner
        if (property.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        Object.assign(property, req.body);
        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Check if user is the owner
        if (property.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await property.remove();
        res.json({ message: "Property deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
