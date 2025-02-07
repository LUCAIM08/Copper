<<<<<<< HEAD
const { model, Schema } = require('mongoose');

module.exports = model('infractions', new Schema({
    Guild: String,
    User: String,
    Infractions: Array
=======
const { model, Schema } = require('mongoose');

module.exports = model('infractions', new Schema({
    Guild: String,
    User: String,
    Infractions: Array
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
}))