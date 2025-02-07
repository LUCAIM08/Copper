<<<<<<< HEAD
const { Schema, model } = require('mongoose');

module.exports = model('Welcome', new Schema({
    Guild: String,
    welcomeChannel: String,
    backgroundImageLink: String,
    message: String,
    embed: Boolean
}))
=======
const { Schema, model } = require('mongoose');

module.exports = model('Welcome', new Schema({
    Guild: String,
    welcomeChannel: String,
    backgroundImageLink: String,
    message: String,
    embed: Boolean
}))
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
