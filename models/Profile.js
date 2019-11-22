const mongoose = require('mongoose');

const Profile = new mongoose.Schema({
    firstName: {
        type: String, 
        trim: true, // delete empty spaces. E.g: 'Bob ' will be sent as 'Bob'. For DB integrity
        default: '' }, // set a default value in case user dont post a firstName
    lastName: {
        type: String,
        trim: true, 
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    team: {
        type: String, 
        trim: true,
        default: '0'
    },
    position: {
        type: String,
        trim: true, 
        default: ''
    }
});

module.exports = mongoose.model('Profile', Profile);