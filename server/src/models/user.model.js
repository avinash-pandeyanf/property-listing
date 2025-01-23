const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        selectRole: {
            type: String,
            enum: ["tenant", "landlord", "admin"], // TODO: Verify auth role
            required: true,
        },
        yourFirstSchool: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.TOKEN_SECRET
    );
};

const User = model("user", userSchema);

module.exports = User;
