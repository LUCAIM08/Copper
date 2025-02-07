<<<<<<< HEAD
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js');
const Transcript = require("discord-html-transcripts");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Bulk delete messages in a chat.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addNumberOption(options => options
        .setName('amount')
        .setDescription('Insert the amount of messages you want to delete.')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addStringOption(options => options
        .setName('reason')
        .setDescription('Insert the reason for the deletion.')
        .setRequired(true)
    )
    .addUserOption(options => options
        .setName('target')
        .setDescription('Insert the user you want to delete messages from.')
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const Amount = interaction.options.getNumber('amount');
        const Reason = interaction.options.getString('reason');
        const Target = interaction.options.getUser('target');

        const channelMessages = await interaction.channel.messages.fetch();
        // const logChannel = 

        const responseEmbed = new EmbedBuilder().setColor('DarkNavy')
        const logEmbed = new EmbedBuilder().setColor("DarkButNotBlack")
        .setAuthor({name: " Clear command used"})

        let logEmbedDescription = [
            `- Moderator: ${interaction.member}`,
            `- Target: ${Target || "None"}`,
            `- Channel: ${interaction.channel}`,
            `- Reason: ${Reason}`
        ];

        if (Target) {
            let i = 0;
            let messagesToDelete = [];
            channelMessages.filter((message) => {
                if(message.author.id === Target.id && Amount > i) {
                    messagesToDelete.push(message);
                    i++
                }
            });

            // const transcript = await Transcript.createTranscript(interaction.channel, {limit: Amount});

            interaction.channel.bulkDelete(messagesToDelete, true).then((messages) => {
                interaction.reply({embeds: [responseEmbed.setDescription(`🧹 Cleared \`${messages.size}\` messages from ${Target}.`)], ephemeral: true})
                logEmbedDescription.push(`- Total messages: ${messages.size}`);
                // logChannel.send({embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))], files: [transcript]})
            })

        } else {
            // const transcript = await Transcript.generateFromMessages(messagesToDelete, interaction.channel);

            interaction.channel.bulkDelete(Amount, true).then((messages) => {
                interaction.reply({embeds: [responseEmbed.setDescription(`🧹 Cleared \`${messages.size}\` messages.`)], ephemeral: true})
                // logChannel.send({embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))], files: [transcript]})
            })
        }
    }
=======
const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction } = require('discord.js');
const Transcript = require("discord-html-transcripts");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Bulk delete messages in a chat.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addNumberOption(options => options
        .setName('amount')
        .setDescription('Insert the amount of messages you want to delete.')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addStringOption(options => options
        .setName('reason')
        .setDescription('Insert the reason for the deletion.')
        .setRequired(true)
    )
    .addUserOption(options => options
        .setName('target')
        .setDescription('Insert the user you want to delete messages from.')
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const Amount = interaction.options.getNumber('amount');
        const Reason = interaction.options.getString('reason');
        const Target = interaction.options.getUser('target');

        const channelMessages = await interaction.channel.messages.fetch();
        // const logChannel = 

        const responseEmbed = new EmbedBuilder().setColor('DarkNavy')
        const logEmbed = new EmbedBuilder().setColor("DarkButNotBlack")
        .setAuthor({name: " Clear command used"})

        let logEmbedDescription = [
            `- Moderator: ${interaction.member}`,
            `- Target: ${Target || "None"}`,
            `- Channel: ${interaction.channel}`,
            `- Reason: ${Reason}`
        ];

        if (Target) {
            let i = 0;
            let messagesToDelete = [];
            channelMessages.filter((message) => {
                if(message.author.id === Target.id && Amount > i) {
                    messagesToDelete.push(message);
                    i++
                }
            });

            // const transcript = await Transcript.createTranscript(interaction.channel, {limit: Amount});

            interaction.channel.bulkDelete(messagesToDelete, true).then((messages) => {
                interaction.reply({embeds: [responseEmbed.setDescription(`🧹 Cleared \`${messages.size}\` messages from ${Target}.`)], ephemeral: true})
                logEmbedDescription.push(`- Total messages: ${messages.size}`);
                // logChannel.send({embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))], files: [transcript]})
            })

        } else {
            // const transcript = await Transcript.generateFromMessages(messagesToDelete, interaction.channel);

            interaction.channel.bulkDelete(Amount, true).then((messages) => {
                interaction.reply({embeds: [responseEmbed.setDescription(`🧹 Cleared \`${messages.size}\` messages.`)], ephemeral: true})
                // logChannel.send({embeds: [logEmbed.setDescription(logEmbedDescription.join("\n"))], files: [transcript]})
            })
        }
    }
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
}