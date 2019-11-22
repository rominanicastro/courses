const mongoose = require('mongoose');

const Team = new mongoose.Schema({
    teamName: {
        type: String,
        trim: true,
        default: ''
    },
    city: {
        type: String,
        trim: true,
        default: ''
    },
    conference: {
        type: String,
        trim: true,
        default: ''
    }
});

module.exports = mongoose.model('Team', Team);