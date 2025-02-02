const Property = require("../../models/property.model.js");
const { ApiResponse } = require("../../utils/ApiResponse.js");
const { ApiError } = require("../../utils/ApiError.js");
const { asyncHandler } = require("../../utils/asyncHandler.js");
const {
    uploadOnCloudinary,
    removeCloudinaryImage,
} = require("../../utils/cloudinary.js");

// Get properties with pagination and sorting
const getProperties = asyncHandler(async (req, res) => {
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

    return res.status(200).send(
        new ApiResponse(
            200,
            {
                properties,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
            },
            "Successfully accessed properties"
        )
    );
});

// Get single property
const getProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params?.id);
    if (!property) {
        throw new ApiError(404, "Property not found");
    }

    // Increment views
    property.views = (property.views || 0) + 1;
    await property.save();

    return res
        .status(200)
        .send(
            new ApiResponse(
                200,
                property,
                "Property accessed successfully with updated views count"
            )
        );
});

// Create property
const createProperty = asyncHandler(async (req, res) => {
    if (!req.body) {
        throw new ApiError(400, "Please provide all fields!");
    }

    let photos = [];
    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            const photo = await uploadOnCloudinary(req.files[i]?.path);
            photos.push({
                url: photo.url,
                public_id: photo.public_id,
            });
        }
    }

    const property = new Property({
        ...req.body,
        owner: req.user._id,
        views: 0,
        photos: photos.map((photo) => photo.url),
        photosDisplayId: photos.map((photo) => photo.public_id),
    });

    const savedProperty = await property.save();
    return res
        .status(201)
        .send(
            new ApiResponse(
                201,
                savedProperty,
                "Property created successfully!"
            )
        );
});

// Update property
const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params?.id);
    if (!property) {
        throw new ApiError(404, "Property not found");
    }

    // Check if user is the owner
    if (property.owner?.toString() !== req.user._id?.toString()) {
        return res.status(403).json({ message: "Not authorized" });
    }

    let photos = [];
    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            const photo = await uploadOnCloudinary(req.files[i]?.path);
            photos.push({
                url: photo.url,
                public_id: photo.public_id,
            });
        }
    }

    property.photosDisplayId.forEach(async (displayId) => {
        await removeCloudinaryImage(displayId);
    });

    Object.assign(property, {
        ...req.body,
        photos: photos?.map((photo) => photo?.url),
        photosDisplayId: photos?.map((photo) => photo?.public_id),
    });
    const updatedProperty = await property.save();
    return res
        .status(200)
        .send(
            new ApiResponse(
                200,
                updatedProperty,
                "Property updated successfully!"
            )
        );
});

// Delete property
const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
        throw new ApiError(404, "Property not found");
    }

    // Check if user is the owner
    if (property.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not Authorized!");
    }

    property.photosDisplayId?.forEach(async (displayId) => {
        await removeCloudinaryImage(displayId);
    });
    await property.deleteOne();

    return res
        .status(200)
        .send(
            new ApiResponse(200, { property }, "Property deleted successfully!")
        );
});

module.exports = {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
};
