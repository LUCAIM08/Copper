const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction, PermissionsBitField } = require('discord.js');
const { data } = require('../setups/setupmemberlog');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tempban')
        .setDescription('Temporarily ban a user from the server.')
        .addUserOption(option => option.setName('user').setDescription('The user to ban.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban.').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('The duration of the ban. (1h, 1w, 1d, 1m)').setRequired(true))
        .addStringOption(option => option.setName('dm_user').setDescription('Send a DM to the user.').addChoices(
            {
                name: 'Yes',
                value: 'true'
            },
            {
                name: 'No',
                value: 'false'
            }
        ).setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * 
     */
    async execute(interaction) {
        const Target = interaction.options.getUser('user');
        const Reason = interaction.options.getString('reason');
        const Duration = interaction.options.getString('duration');
        const DMUser = interaction.options.getString('dm_user');

        if(Target.id === interaction.member.id) return interaction.reply({content: "You can't ban yourself.", ephemeral: true});
        if(Target.id === interaction.guild.ownerId) return interaction.reply({content: "You can't ban the owner of the server.", ephemeral: true})
        if(Target.id === interaction.client.user.id) return interaction.reply({content: "You can't ban me.", ephemeral: true});

        const responseEmbed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({name: "User tempbanned"})
            .setDescription(`User ${Target} has been tempbanned from the server.`)
            .addFields([
                {name: "Moderator", value: interaction.user.tag, inline: true},
                {name: "Target", value: Target.tag, inline: true},
                {name: "Reason", value: Reason, inline: true},
                {name: "Duration", value: Duration, inline: true}
            ])
            .setFooter({text: `Copper BOT`})
            .setTimestamp()
            .setThumbnail(Target.displayAvatarURL({dynamic: true}))

        const dmEmbed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({name: "You have been tempbanned"})
            .setDescription(`You have been tempbanned from the server ${interaction.guild.name}.`)
            .addFields([
                {name: "Moderator", value: interaction.user.tag, inline: true},
                {name: "Reason", value: Reason, inline: true},
                {name: "Duration", value: Duration, inline: true}
            ])
            .setFooter({text: `Copper BOT`})
            .setTimestamp()
            .setThumbnail(Target.displayAvatarURL({dynamic: true}))

        // const logChannel = interaction.guild.channels.cache.find(channel => channel.name === 'logs');
        const BanRole = interaction.guild.roles.cache.find(role => role.name === 'Temporarily Banned');

        if(!BanRole) {
            try {
                const BanRole = await interaction.guild.roles.create({
                    name: 'Temporarily Banned',
                    color: 'RED',
                    permissions: []
                });

                interaction.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.permissionOverwrites.edit(BanRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        CONNECT: false
                    });
                });
            } catch (error) {
                console.log(error);
            }
        }

        let RestoreRoles = [];
        
        Target.member.roles.forEach((role, id) => {
            if(role.name !== '@everyone') {
                let roleID = role.id;
                Target.roles.remove(role.id);
                RestoreRoles.push(roleID);
            }
        });

        await database.findOneAndUpdate(
            { Guild: guild.id },
            {
                Guild: guild.id,
                Target: Target.id,
                duration: Duration,
                memberRoles: RestoreRoles,
                reason: Reason
            },
            { upsert: true }
        );

        Target.roles.add(BanRole.id);
        Target.send({embeds: [dmEmbed]});

        interaction.reply({embeds: [responseEmbed], ephemeral: true});

        setTimeout(async () => {
            await database.findOneAndDelete({ Target: Target.id });
            Target.roles.remove(BanRole.id);
            RestoreRoles.forEach(role => {
                Target.member.roles.add(role);
            });
        }, ms(Duration));
    }
}