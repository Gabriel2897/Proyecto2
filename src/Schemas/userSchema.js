const mongoose = require('mongoose');
const { Schema, model } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 3
    }
},
    {
        timestamps: true
    });
const User =model("User", userSchema)

module.exports = User;