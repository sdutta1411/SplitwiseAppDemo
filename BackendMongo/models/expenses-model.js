const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({

    group_name: {
        type: String,
        required: true
    },

    user_email: {
        type: String,
        required: true
    },

    user_name: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        require: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('expenses', ExpenseSchema);