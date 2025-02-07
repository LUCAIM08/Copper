<<<<<<< HEAD
const { Schema, model } = require('mongoose');

module.exports = model('TempBans', new Schema({
    Guild: String,
    Target: String,
    duration: Number,
    memberRoles: String,
    reason: String
}))
=======
const { Schema, model } = require('mongoose');

module.exports = model('TempBans', new Schema({
    Guild: String,
    Target: String,
    duration: Number,
    memberRoles: String,
    reason: String
}))
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
