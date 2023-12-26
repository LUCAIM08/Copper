const { Schema, model } = require('mongoose');

module.exports = model('TempBans', new Schema({
    Guild: String,
    Target: String,
    duration: Number,
    memberRoles: String,
    reason: String
}))
