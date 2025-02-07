const { Schema, model } = require('mongoose');

module.exports = model('MainteinanceStatus', new Schema({
    finder: String,
    status: Boolean,
    info: String
}))
