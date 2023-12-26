const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const Database = require('../../schemas/infractions');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Restrict a user from chatting')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDMPermission(false)
        .addUserOption(options => options
            .setName('target')
            .setDescription('Select the target member')
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName('duration')
            .setDescription('Insert a duration (1m, 1h, 1d)')
            .setRequired(true)
        )
        .addStringOption(options => options
            .setName('reason')
            .setDescription('Insert a reason')
            .setMaxLength(512)
        ),
    /**
     *  
     * @param {ChatInputCommandInteraction} interaction
     * 
     */
    async execute(interaction) {
        const { options, guild, member } = interaction;

        const target = options.getMember('target');
        const duration = options.getString('duration');
        const reason = options.getString('reason') || 'No reason provided';

        const errorsArray = [];

        const errorsEmbed = new EmbedBuilder()
        .setAuthor({name: "Could not timeout member due to"})
        .setColor('Red');

        if (!target) return interaction.reply({
            embeds: [errorsEmbed.setDescription('You must select a valid member to timeout')],
            ephemeral: true
        })

        if(!ms(duration) || ms(duration) > ms('28d')) 
        errorsArray.push('You must provide a valid duration or the duration is over the limit of 28 days');

        if(!target.manageable || !target.moderatable)
        errorsArray.push('Selected member is not manageable or moderatable by this bot');

        if(member.roles.highest.position < target.roles.highest.position)
        errorsArray.push('Selected member has a higher role position than you');

        if(errorsArray.length) return interaction.reply({
            embeds: [errorsEmbed.setDescription(errorsArray.join('\n'))],
            ephemeral: true
        })

        target.timeout(ms(duration), reason).catch((err) => {
            interaction.reply({
                embeds: [errorsEmbed.setDescription(`An error occured while trying to timeout the member\n\`\`\`${err}\`\`\``)],
                ephemeral: true
            })
            return console.log("Error occured in timeout", err);
        })

        const newInfractionObject = {
            IssuerID: member.id,
            IssuerTag: member.user.tag,
            Reason: reason,
            Date: Date.now()
        }

        let userData = await Database.findOne({ Guild: guild.id, User: target.id });
        if(!userData)
        userData = await Database.create({ Guild: guild.id, User: target.id, Infractions: [newInfractionObject] });
        else 
        userData.Infractions.push(newInfractionObject) && await userData.save();

        const successEmbed = new EmbedBuilder()
        .setAuthor({name: `${target.user.tag} has been timed out`, iconURL: target.user.displayAvatarURL()})
        .setColor('Gold')
        .setDescription([
            `${target} was issued a timeout for **${ms(ms(duration), {long: true})}** by ${member}`,
            `bringing their infractions total to **${userData.Infractions.length}** points.`,
            `\nReason: **${reason}**`
        ].join('\n'));

        return interaction.reply({ embeds: [successEmbed] });
    }
}