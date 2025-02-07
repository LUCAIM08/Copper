<<<<<<< HEAD
const { Schema, model } = require('mongoose');

module.exports = model('MemberLog', new Schema({
    Guild: String,
    logChannel: String,
    memberRole: String,
    botRole: String
}))
=======
const { Schema, model } = require('mongoose');

module.exports = model('MemberLog', new Schema({
    Guild: String,
    logChannel: String,
    memberRole: String,
    botRole: String
}))
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
