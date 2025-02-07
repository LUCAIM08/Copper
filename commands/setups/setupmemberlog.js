<<<<<<< HEAD
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require('discord.js');
const database = require('../../schemas/memberlog');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup_memberlog')
    .setDescription('Setup the member logging system for the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((options) => options
        .setName('log_channel')
        .setDescription('Select the channel where the logs will be sent to')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((options) => options
        .setName('member_role')
        .setDescription('Select the role that will be given automatically to members when they join')
    )
    .addRoleOption((options) => options
        .setName('bot_role')
        .setDescription('Select the role that will be given automatically to bots when they join')
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const logChannel = options.getChannel('log_channel').id;
        
        let memberRole = options.getRole('member_role') ? 
        options.getRole('member_role').id : null;

        let botRole = options.getRole('bot_role') ?
        options.getRole('bot_role').id : null;

        await database.findOneAndUpdate(
            { Guild: guild.id }, 
            {
                logChannel: logChannel,
                memberRole: memberRole,
                botRole: botRole
            },
            {new: true, upsert: true}
        );

        client.guildConfig.set(guild.id, {
            logChannel: logChannel,
            memberRole: memberRole,
            botRole: botRole
        });

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setDescription([
            `- Logging channel updated to <#${logChannel}>`,
            `- Member automatic role updated to ${memberRole ? `<@&${memberRole}>` : "Disabled"}`,
            `- Bot automatic role updated to ${botRole ? `<@&${botRole}>` : "Disabled"}`
        ].join('\n'));

        return interaction.reply({
            embeds: [embed]
        });
    }
=======
const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require('discord.js');
const database = require('../../schemas/memberlog');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup_memberlog')
    .setDescription('Setup the member logging system for the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addChannelOption((options) => options
        .setName('log_channel')
        .setDescription('Select the channel where the logs will be sent to or select "#member-log" channel created on setup')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addRoleOption((options) => options
        .setName('member_role')
        .setDescription('Select the role that will be given automatically to members when they join')
    )
    .addRoleOption((options) => options
        .setName('bot_role')
        .setDescription('Select the role that will be given automatically to bots when they join')
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const logChannel = options.getChannel('log_channel').id;
        
        let memberRole = options.getRole('member_role') ? 
        options.getRole('member_role').id : null;

        let botRole = options.getRole('bot_role') ?
        options.getRole('bot_role').id : null;

        await database.findOneAndUpdate(
            { Guild: guild.id }, 
            {
                logChannel: logChannel,
                memberRole: memberRole,
                botRole: botRole
            },
            {new: true, upsert: true}
        );

        client.guildConfig.set(guild.id, {
            logChannel: logChannel,
            memberRole: memberRole,
            botRole: botRole
        });

        const embed = new EmbedBuilder()
        .setColor('Green')
        .setDescription([
            `- Logging channel updated to <#${logChannel}>`,
            `- Member automatic role updated to ${memberRole ? `<@&${memberRole}>` : "Disabled"}`,
            `- Bot automatic role updated to ${botRole ? `<@&${botRole}>` : "Disabled"}`
        ].join('\n'));

        return interaction.reply({
            embeds: [embed]
        });
    }
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
}