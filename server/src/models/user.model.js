const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const UserSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    phoneNumber: {
        type: Schema.Types.String,
        required: true,
    },
    selectRole: {
        type: Schema.Types.String,
        required: true,
    },
    yourFirstSchool: {
        type: Schema.Types.String,
        required: true,
    },
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.TOKEN_SECRET
    );
};

const User = model("user", UserSchema);

module.exports = User;
