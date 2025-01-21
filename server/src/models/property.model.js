const { model, Schema } = require("mongoose");

const PropertySchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    ownersContactNumber: {
        type: Schema.Types.String,
        required: true,
    },
    ownersAlternateNumber: {
        type: Schema.Types.String,
        required: true,
    },
    locality: {
        type: Schema.Types.String,
        required: true,
    },
    address: {
        type: Schema.Types.String,
        required: true,
    },
    spaceType: {
        type: Schema.Types.String,
        required: true,
    },
    petsAllowed: {
        type: Schema.Types.String,
        required: true,
    },
    preference: {
        type: Schema.Types.String,
        required: true,
    },
    bachelors: {
        type: Schema.Types.String,
        required: true,
    },
    type: {
        type: Schema.Types.String,
        required: true,
    },
    bhk: {
        type: Schema.Types.String,
        required: true,
    },
    floor: {
        type: Schema.Types.String,
        required: true,
    },
    nearestLandmark: {
        type: Schema.Types.String,
        required: true,
    },

    typeOfWashroom: {
        type: Schema.Types.String,
        required: true,
    },
    coolingFacility: {
        type: Schema.Types.String,
        required: true,
    },
    carParking: {
        type: Schema.Types.String,
        required: true,
    },
    subscriptionAmount: {
        type: Schema.Types.String,
        required: true,
    },
    photos: {
        type: Schema.Types.String,
        required: true,
    },
    squareFeetArea: {
        type: Schema.Types.String,
        required: true,
    },
    appliances: {
        type: Schema.Types.String,
        required: true,
    },
    amenities: {
        type: Schema.Types.String,
        required: true,
    },
    aboutTheProperty: {
        type: Schema.Types.String,
        required: true,
    },
    comments: {
        type: Schema.Types.String,
        required: true,
    },
});

const Property = model("Property", PropertySchema);

module.exports = Property;
