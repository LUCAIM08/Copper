const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('init')
    .setDescription('Initialize the bot and create the necessary channels and roles.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {
        if(interaction.guild.channels.cache.find(channel => channel.name === 'Copper Dashboard')) { 
            let embed = new EmbedBuilder()
            .setDescription('The initialization has already been done.')
            .setColor('Orange')
            .setTimestamp()

            return interaction.reply({ embeds: [ embed ], ephemeral: true })
        } 

        let embedStart = new EmbedBuilder()
        .setDescription('You have started the initialization. Please do not delete the bot messages until the initialization is complete.')
        .setColor('#008000')
        .setTimestamp()

        interaction.reply({ embeds: [embedStart] }).then(msg => {

        // Create the necessary channels
        let guild = interaction.guild
        
        guild.channels.create({
            name: 'Copper Dashboard',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: PermissionFlagsBits.ViewChannel
                }
            ]
        }).then(category => {
            guild.channels.create({
                name: 'member-log',
                parent: category.id,
                type: ChannelType.GUILD_TEXT,
                topic: 'Logs of all members joining.',
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: PermissionFlagsBits.ViewChannel
                    }
                ]
            })

            guild.channels.create({
                name: 'message-log',
                parent: category.id,
                type: ChannelType.GUILD_TEXT,
                topic: 'Logs of all messages deleted.',
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: PermissionFlagsBits.ViewChannel
                    }
                ]
            })

            guild.channels.create({
                name: 'role-log',
                parent: category.id,
                type: ChannelType.GUILD_TEXT,
                topic: 'Logs of all roles added or removed.',
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: PermissionFlagsBits.ViewChannel
                    }
                ]
            })

            guild.channels.create({
                name: 'voice-log',
                parent: category.id,
                type: ChannelType.GUILD_TEXT,
                topic: 'Logs of all members joining or leaving voice channels.',
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: PermissionFlagsBits.ViewChannel
                    }
                ]
            })

            guild.channels.create({
                name: 'mod-log',
                parent: category.id,
                type: ChannelType.GUILD_TEXT,
                topic: 'Logs of all moderation actions.',
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: PermissionFlagsBits.ViewChannel
                    }
                ]
            })

        })

        // Wait 1 second
        setTimeout(() => {}, 5000)

        let embedEnd = new EmbedBuilder()
        .setDescription('The initialization is complete. You can now delete the bot messages.')
        .addFields(
            {
                name: 'Can i edit the channels?',
                value: 'Yes, you can edit the channels as you wish, remember to re-do every setup in order for the bot to work. But please do not delete them, as they are necessary for the bot to work.'
            })
        .setColor('#008000')
        .setTimestamp()

        interaction.editReply({ embeds: [embedEnd] }
        )
        }
        )

    }
}