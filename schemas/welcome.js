const { Schema, model } = require('mongoose');

module.exports = model('Welcome', new Schema({
    Guild: String,
    welcomeChannel: String,
    backgroundImageLink: String,
    message: String,
    embed: Boolean
}))
