const { Schema, model } = require('mongoose');

module.exports = model('Suggestions', new Schema({
    Guild: String,
    Channel: String
}))
