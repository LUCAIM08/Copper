<<<<<<< HEAD
const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;   

        const command = client.commands.get(interaction.commandName);
        if(!command) 
        return interaction.reply({ 
            content: "This command is outdated or does not exist.", 
            ephemeral: true 
        });

        if (command.developer && interaction.user.id !== "554389950083235840")
        return interaction.reply({ 
            content: "This command is only available to the developer.", 
            ephemeral: true 
        });

        const subCommand = interaction.options.getSubcommand(false);
        if (subCommand) {
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if(!subCommandFile) 
            return interaction.reply({ 
                content: "This sub command is outdated.", 
                ephemeral: true 
            });
            subCommandFile.execute(interaction, client);
        } else command.execute(interaction, client);
    }
=======
const { ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
let database = require("../../schemas/mainteinance");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;   

        const command = client.commands.get(interaction.commandName);
        if(!command) 
        return interaction.reply({ 
            content: "This command is outdated or does not exist.", 
            ephemeral: true 
        });

        let flag = false;

        await database.findOne({ finder: "ciao" }).then(data => {
            if(data.status && interaction.commandName != "mainteinance") {
                let embed = new EmbedBuilder()
                .setTitle("Ehm... Seems like i'm busy right now.")
                .setColor("Orange")
                .setDescription("The bot is currently in mainteinance mode.\n\n**Mainteinance Reason**: " + data.info)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

                let button = new ButtonBuilder()
                .setLabel("More Info")
                .setStyle("5")
                .setURL("https://discord.gg/e5DRxa69zm")
                .setEmoji("🔧")

                let actionRow = new ActionRowBuilder()
                .addComponents(button)

                console.log("Command " + interaction.commandName + " is disabled due to mainteinance mode.")
                flag = true;
                return interaction.reply({ embeds: [embed], components: [actionRow]})
            }
            
        })
        
        if(flag) return;

        if (command.developer && interaction.user.id !== "1186990133069758526") {
            let embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("You don't have permission to use this command.")
            return interaction.reply({ embeds: [embed], ephemeral: true })
        }
        
        const subCommand = interaction.options.getSubcommand(false);
        if (subCommand) {
            const subCommandFile = client.subCommands.get(`${interaction.commandName}.${subCommand}`);
            if(!subCommandFile) 
            return interaction.reply({ 
                content: "This sub command is outdated.", 
                ephemeral: true 
            });
            subCommandFile.execute(interaction, client);
        } else command.execute(interaction, client);
    }
>>>>>>> a75dcb5 (Rimosso node_modules e aggiornato .gitignore)
}