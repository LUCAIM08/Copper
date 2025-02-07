<<<<<<< HEAD
const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

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
        interaction.reply({ content: "Pong!", ephemeral: true });
    }

}
=======
const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("🤓 Some math stuff for the nerds."),
    /**
     *  
     * @param {ChatInputCommandInteraction} interaction
     *
     */
    execute(interaction) {
        let embed = new EmbedBuilder()
        .setTitle("Status")
        .setDescription(`🏓 Pong! ${client.ws.ping}ms`)
        .addFields( 
            { name: "Bot Latency", value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true},
            { name: "API Latency", value: `${Math.round(client.ws.ping)}ms`, inline: true},
            { name: "Uptime", value: `${client.uptime}ms` },
            { name: "Memory Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true},
            { name: "Users", value: `${client.users.cache.size}`, inline: true },
            { name: "Servers", value: `${client.guilds.cache.size}`, inline: true },
            { name: "Channels", value: `${client.channels.cache.size}`, inline: true },
            { name: "Node.js Version", value: `${process.version}`, inline: true }
        )
        .setThumbnail(client.user.avatarURL())
        .setColor("#e06b38")
        .setTimestamp()

        interaction.reply({ embeds: [embed] });
    }

}
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
