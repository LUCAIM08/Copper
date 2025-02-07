const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { loadCommands } = require("../../../handlers/commandHandler")
const database = require("../../../schemas/mainteinance");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("mainteinance")
    .setDescription("Set mainteinance status.")
    .addBooleanOption(options => options
        .setName("status")
        .setDescription("Set the bot mainteinance status.")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("info")
        .setDescription("Set the bot mainteinance info.")
        .setRequired(false)
    ),
    /**
    *  
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
    async execute(interaction, client) {

        let status = interaction.options.getBoolean("status");
        let info = interaction.options.getString("info") || "No info provided.";

        // Check if the mainteinance status is already set
        let data = await database.findOne({ finder: "ciao" });
        if(data.status === status) {
            let embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("The mainteinance status is already set to " + status + ".") 

            return interaction.reply({ embeds: [embed], ephemeral: true })
        } else {
            database.findOneAndUpdate( { finder: "ciao" }, { status: status, info: info} ).then(() => {
                let embed = new EmbedBuilder()
                .setColor(status ? "Green" : "Orange")
                .setDescription("The mainteinance status has been set to " + status + ".\n\n**Remember**: `Events are not affected by the mainteinance status.`")

                return interaction.reply({ embeds: [embed], ephemeral: true })
            })
        }

        // Reload commands
        loadCommands(client);
    }

}