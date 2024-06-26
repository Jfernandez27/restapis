const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        requided: true,
    },
});

module.exports = mongoose.model('Users', usersSchema);
