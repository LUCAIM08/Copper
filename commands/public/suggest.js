const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Suggestions for the server, only works if the server has the suggestion system setup.")
    .setDMPermission(false)
    .addStringOption(options => options
        .setName("text")
        .setDescription("Insert the suggestion.")
        .setRequired(true)
    ),
    /**
     *  
     * @param {ChatInputCommandInteraction} interaction
     *
     */
    async execute(interaction) {
        let Text = interaction.options.getString("text");

        if (Text.length > 1024) return interaction.reply({ content: "The suggestion must be less than 1024 characters!", ephemeral: true });

        await database.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (!data) {
                interaction.reply({ content: "The server doesn't have the suggestion system setup.", ephemeral: true })
                return;
            } 
            else if (data) {
                const channel = interaction.guild.channels.cache.get(data.Channel);
                if (!channel) return;
                const embed = new EmbedBuilder()
                .setColor("#b45f06")
                .setDescription("```" + Text + "```")
                .setTitle("New suggestion!")
                .setTimestamp()
                .setFooter({ text: `Suggested by ${interaction.user.tag} | Using Copper Suggestion System` })

                channel.send({ embeds: [embed] });

                const suggestembed = new EmbedBuilder()
                .setColor("#A3CD92")
                .setDescription("```" + Text + "```")
                .setTitle("Thanks for your suggestion!")
                .setTimestamp()
                .setFooter({ text: `Suggested by ${interaction.user.tag} | Using Copper Suggestion System` })

                interaction.reply({ embeds: [suggestembed], ephemeral: true });
            }
        })
    }
}
