const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
    /**
     *  
     * @param {ChatInputCommandInteraction} interaction
     *
     */
    execute(interaction) {
        // Make an embed with information about the bot
        let embed = new EmbedBuilder()
        .setTitle("Pong!")
        .setDescription(`🏓 Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`)
        .setColor("Orange")
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .addFields(
            { name: "Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
            { name: "Users", value: `${interaction.client.users.cache.size}`, inline: true },
            { name: "Channels", value: `${interaction.client.channels.cache.size}`, inline: true },
            { name: "Uptime", value: `${Math.floor(interaction.client.uptime / 1000 / 60)} minutes`, inline: false },
            { name: "Memory Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
            { name: "Node.js Version", value: `${process.version}`, inline: true }
        )
        .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }

}
