const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },

    password: {
        type: String,
        required: true,
        minlength: 5
    },

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: '0000000000'
    },

    currency: {
        type: String,
        default: 'USD'
    },

    timezone: {
        type: String,
        default: 'PST'
    },

    language: {
        type: String,
        default: 'English'
    }

});

module.exports = mongoose.model('users', UserSchema);