<<<<<<< HEAD
const { ChatInputCommandInteraction } = require("discord.js");
const { loadCommands } = require("../../../handlers/commandHandler")

module.exports = {
    subCommand: "reload.commands",
    /**
    *  
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
    execute(interaction, client) {
        loadCommands(client);
        interaction.reply({ content: "Reloaded all commands.", ephemeral: true });
    }

=======
const { ChatInputCommandInteraction } = require("discord.js");
const { loadCommands } = require("../../../handlers/commandHandler")

module.exports = {
    subCommand: "reload.commands",
    /**
    *  
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
    execute(interaction, client) {
        loadCommands(client);
        interaction.reply({ content: "Reloaded all commands.", ephemeral: true });
    }

>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
}