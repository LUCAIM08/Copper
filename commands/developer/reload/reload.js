const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads all commands and events.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options
        .setName("events")
        .setDescription("Reloads all events."))
    .addSubcommand((options) => options
        .setName("commands")
        .setDescription("Reloads all commands.")),
}