<<<<<<< HEAD
const { model, Schema } = require('mongoose');

module.exports = model('Warns', new Schema({
    Guild: String,
    User: String,
    Warns: Array
=======
const { model, Schema } = require('mongoose');

module.exports = model('Warns', new Schema({
    Guild: String,
    User: String,
    Warns: Array
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
}))