const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({

    user_name: {
        type: String,
        required: true
    },

    user_status: {
        type: String,
        required: true
    },
});

const GroupSchema = mongoose.Schema({

    group_name: {
        type: String,
        required: true
    },

    members: [MemberSchema]

});


module.exports = mongoose.model('groups', GroupSchema);


