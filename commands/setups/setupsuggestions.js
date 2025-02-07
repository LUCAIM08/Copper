<<<<<<< HEAD
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require('discord.js');
const database = require('../../schemas/suggestions');
const suggestions = require('../../schemas/suggestions');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup_suggestions')
    .setDescription('Setup the suggestion system for the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((options) => options
        .setName('channel')
        .setDescription('Select the channel where the suggestions will be sent to')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        let Channel = interaction.options.getChannel('channel');

        await database.findOneAndUpdate({
            Guild: interaction.guild.id
        }, {
            Guild: interaction.guild.id,
            Channel: Channel.id
        }, {
            upsert: true
        });

        const embed = new EmbedBuilder()
        .setColor('#A3CD92')
        .setDescription(`The suggestions channel has been set to ${Channel}`)
        .setTitle('The suggestions will now arrive here!')
        .setTimestamp();

        Channel.send({ embeds: [embed] });

        const sembed = new EmbedBuilder()
        .setColor('#A3CD92')
        .setDescription(`The suggestions channel has been succesfully set to ${Channel}`)
        .setTitle('Succeffully setup the suggestions system')
        .setTimestamp();

        interaction.reply({ embeds: [sembed], ephemeral: true });
    }
=======
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require('discord.js');
const database = require('../../schemas/suggestions');
const suggestions = require('../../schemas/suggestions');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup_suggestions')
    .setDescription('Setup the suggestion system for the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((options) => options
        .setName('channel')
        .setDescription('Select the channel where the suggestions will be sent to')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        let Channel = interaction.options.getChannel('channel');

        await database.findOneAndUpdate({
            Guild: interaction.guild.id
        }, {
            Guild: interaction.guild.id,
            Channel: Channel.id
        }, {
            upsert: true
        });

        const embed = new EmbedBuilder()
        .setColor('#A3CD92')
        .setDescription(`The suggestions channel has been set to ${Channel}`)
        .setTitle('The suggestions will now arrive here!')
        .setTimestamp();

        Channel.send({ embeds: [embed] });

        const sembed = new EmbedBuilder()
        .setColor('#A3CD92')
        .setDescription(`The suggestions channel has been succesfully set to ${Channel}`)
        .setTitle('Succeffully setup the suggestions system')
        .setTimestamp();

        interaction.reply({ embeds: [sembed], ephemeral: true });
    }
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
}