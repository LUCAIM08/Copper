const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName('emit')
    .setDescription('Emit an event to the client')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption((options) => options
        .setName('event')
        .setDescription('The event to emit')
        .setRequired(true)
    )
    .setDMPermission(false),
    /**
     *  
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        const { options } = interaction;
        const event = options.getString('event');

        client.emit(event, interaction.member);

        interaction.reply({
            content: `Emitted event`,
            ephemeral: true
        });
    }
}