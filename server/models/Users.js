const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: [true, "Please provide a username"]
    },

    email: {
        type: 'string',
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email"
        ]
    },

    password: {
        type: 'string',
        required: [true, "Please provide a password"],
        minLength: 6,
        select: false
    },

    resetPasswordToken: String,
    resetPasswordExpired: Date
});

// Run middleware for pre-saving and post-saving
// used to hash password
UserSchema.pre("save", async function(next) {

    // if the password didnt change, leave it,
    if (!this.isModified("password")) {
        next();
    }

    // if the password is added or changed, then hash it
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Checking is passwords are correct
UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// generating token
UserSchema.methods.getSignedToken = function() {
    return jwt.sign(
        { id: this._id, email: this._email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE}
    )
}

// resetting password token
UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    
    this.resetPasswordExprire = Date.now() + 10 * (60 *1000);
    return resetToken;
}


const User = mongoose.model('User', UserSchema);
module.exports = User;