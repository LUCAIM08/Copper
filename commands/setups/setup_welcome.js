const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChatInputCommandInteraction, ApplicationCommandOptionWithChoicesAndAutocompleteMixin } = require('discord.js');
const database = require('../../schemas/welcome');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup_welcome')
    .setDescription('Setup the welcome system for your server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
    .addChannelOption((options) => options
        .setName('channel')
        .setDescription('The channel to send the welcome message in.')
        .setRequired(true)
    )
    .addStringOption((options) => options
        .setName('embed')
        .setDescription('Whether or not to send the message in an embed.')
        .setRequired(true)
        .addChoices(
            {
                name: 'Yes',
                value: 'true' 
            }
        )
        .addChoices(
            {
                name: 'No',
                value: 'false'
            }
        )
    )
    .addStringOption((options) => options
        .setName('image_link')
        .setDescription('Set the background image for the welcome message.')
        .setRequired(false)
    )
    .addStringOption((options) => options
        .setName('message')
        .setDescription('The message to send when a user joins. (${user}, ${guild}, ${memberCount})')
        .setRequired(false)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {

        interaction.reply({ content: 'This command is currently disabled or its a only beta users feature.', ephemeral: true });
        /*
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');
        const embed = interaction.options.getString('embed');
        const imageLink = interaction.options.getString('image_link');

        if(!message || !embed) return interaction.reply({ content: 'Please provide at least a option between "embed" and "message" the required arguments.', ephemeral: true });
        const newData = new database({
            Guild: interaction.guild.id,
            welcomeChannel: channel.id,
            backgroundImageLink: imageLink,
            message: message,
            embed: embed
        });

        await database.findOneAndUpdate({ Guild: interaction.guild.id },
            {
                welcomeChannel: channel.id,
                message: message,
                backgroundImageLink: imageLink,
                embed: embed
            },
            {new: true, upsert: true })

        const embedMessage = new EmbedBuilder()
        .setTitle('Welcome System')
        .setDescription('The welcome system has been setup successfully.')
        .setColor('Green');

        await interaction.reply({ embeds: [embedMessage] });
        */
    }
}
