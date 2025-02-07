const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user, if you want to serup the warn system use /setup_warn.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false)
    .addUserOption(options => options
        .setName('target')
        .setDescription('Insert the user you want to warn.')
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName('reason')
        .setDescription('Insert the reason for the warn.')
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
    )
    .addStringOption(options => options
        .setName('duration')
        .setDescription('Insert the duration of the warn or leave blank for permanent.')
        .setRequired(false)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        let Target = interaction.options.getUser('target');
        let Reason = interaction.options.getString('reason');
        let DmUser = interaction.options.getString('dm_user');
        let Duration = interaction.options.getString('duration');

        let WarnEmbed = new EmbedBuilder()
        .setTitle('Warn')
        .setColor('#ff5050')
        
        // DA FINIRE!
    }
}