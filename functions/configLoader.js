<<<<<<< HEAD
const configDatabase = require('../schemas/memberlog');

async function loadConfig(client) {
    (await configDatabase.find()).forEach((doc) => {
        client.guildConfig.set(doc.Guild, {
            logChannel: doc.logChannel,
            memberRole: doc.memberRole,
            botRole: doc.botRole
        });
    });

    return console.log('Loaded guild configs to the collection');
}

=======
const configDatabase = require('../schemas/memberlog');

async function loadConfig(client) {
    (await configDatabase.find()).forEach((doc) => {
        client.guildConfig.set(doc.Guild, {
            logChannel: doc.logChannel,
            memberRole: doc.memberRole,
            botRole: doc.botRole
        });
    });

    return console.log('Loaded guild configs to the collection');
}

>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
module.exports = { loadConfig }