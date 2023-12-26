const { model, Schema } = require('mongoose');

module.exports = model('Warns', new Schema({
    Guild: String,
    User: String,
    Warns: Array
}))