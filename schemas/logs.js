const { model, Schema } = require('mongoose');

module.exports = model('logs', new Schema({
    Guild: String,
    Activated: Boolean,
    Channel: String
}))