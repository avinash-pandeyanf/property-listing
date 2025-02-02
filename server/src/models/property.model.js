const { model, Schema } = require("mongoose");

const PropertySchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        ownersContactNumber: {
            type: String,
            required: true,
        },
        ownersAlternateNumber: {
            type: String,
        },
        locality: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        spaceType: {
            type: String,
            required: true,
            enum: ["Flat", "House", "PG", "Warehouse", "Office", "Shop"],
        },
        petsAllowed: {
            type: Boolean,
            required: true,
        },
        preference: {
            type: String,
            required: true,
            enum: ["Family", "Bachelors", "Any"],
        },
        bachelors: {
            type: String,
            enum: ["Male", "Female"],
        },
        type: {
            type: String,
            enum: ["Semi Furnished", "Fully Furnished", "Non Furnished"],
            required: true,
        },
        bhk: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
        floor: {
            type: String,
            required: true,
        },
        nearestLandmark: {
            type: String,
            required: true,
        },

        typeOfWashroom: {
            type: String,
            enum: ["Western", "Indian"],
            required: true,
        },
        coolingFacility: {
            type: String,
            enum: ["AC", "Fan"],
            required: true,
        },
        carParking: {
            type: Boolean,
            required: true,
        },
        subscriptionAmount: {
            type: String,
            required: true,
        },
        photos: {
            type: [String],
            required: true,
        },
        photosDisplayId: {
            type: [String],
            required: true,
        },
        squareFeetArea: {
            type: String,
            required: true,
        },
        appliances: {
            type: String,
        },
        amenities: {
            type: String,
        },
        aboutTheProperty: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
        },
    },
    { timestamps: true }
);

const Property = model("Property", PropertySchema);

module.exports = Property;
