const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption(options => options
        .setName('target')
        .setDescription('Insert the user you want to ban.')
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName('reason')
        .setDescription('Insert the reason for the ban.')
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName('dm_user')
        .setDescription('Send a DM to the user.')
        .addChoices(
            {
                name: 'Yes',
                value: 'true'
            },
            {
                name: 'No',
                value: 'false'
            }
        )
        .setRequired(true)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const Target = interaction.options.getUser('target');
        const Reason = interaction.options.getString('reason');
        const DMUser = interaction.options.getString('dm_user');

        if(Target.id === interaction.member.id) return interaction.reply({content: "You can't ban yourself.", ephemeral: true});
        if(Target.id === interaction.guild.ownerId) return interaction.reply({content: "You can't ban the owner of the server.", ephemeral: true})
        if(Target.id === interaction.client.user.id) return interaction.reply({content: "You can't ban me.", ephemeral: true});

        const responseEmbed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({name: "User banned"})
        .setDescription(`User ${Target} has been banned from the server.`)
        .addFields([
            {name: "Moderator", value: interaction.user.tag, inline: true},
            {name: "Target", value: Target.tag, inline: true},
            {name: "Reason", value: Reason, inline: true}
        ])
        .setFooter({text: `Reason: ${Reason}`})
        .setTimestamp()
        .setThumbnail(Target.displayAvatarURL({dynamic: true}))

        const logEmbed = new EmbedBuilder()
        .setColor("Red")
        .setAuthor({name: "User banned"})
        .setDescription(`- Moderator: ${interaction.user.tag}\n- Target: ${Target.tag}\n - Reason: ${Reason}`)
        .setTimestamp()
        .setThumbnail(Target.displayAvatarURL({dynamic: true}))

        if(DMUser === 'true') {
            const MemberDM = new EmbedBuilder()
            .setColor('DarkNavy')
            .setDescription("You have been banned from **" + interaction.guild.name + "**.")
            .addFields({name: "Reason", value: Reason})
            .setTimestamp()
            .setAuthor({name: "Action performed by " + interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL({dynamic: true})})
            .setThumbnail(interaction.guild.iconURL({dynamic: true}));

            await Target.send({embeds: [MemberDM]});
        }

        // console.log(Target, Reason)
        interaction.guild.members.ban(Target, {reason: Reason}).catch(err => {
            console.log(err);
            return interaction.reply({content: "An error occurred while trying to ban the user. Maybe i don't have the sufficient permissions.", ephemeral: true});
        });
        interaction.reply({embeds: [responseEmbed], ephemeral: true});
    }
}