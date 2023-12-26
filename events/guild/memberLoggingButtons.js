const { ButtonInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    /**
     * 
     * @param {ButtonInteraction} interaction
     */
    async execute(interaction) {
        if(!interaction.isButton()) return;

        const splitArray = interaction.customId.split('-');
        if(!splitArray[0] === "MemberLogging") return;

        const member = (await interaction.guild.members.fetch()).get(splitArray[2]);
        const embed = new EmbedBuilder()
        const errorArray = [];

        if(!interaction.member.permissions.has('KickMembers'))
            errorArray.push("You do not have the required permissions to execute this action");

        if(!member)
        errorArray.push("The member you are trying to kick is not in the server");

        if(!member.moderatable)
        errorArray.push(`${member} is not moderatable by this bot`);

        if(errorArray.length) return interaction.reply({
            embeds: [embed.setDescription(errorArray.join('\n'))],
            ephemeral: true
        });

        switch(splitArray[1]) {
            case "Kick": {
                member.kick({ reason: `Kicked by ${interaction.user.tag} | Your account is suspicious or is too new for this server` }).then(() => {
                    interaction.reply({
                        embeds: [embed.setDescription(`${member} has been kicked`)]
                    });
                }).catch(() => {
                    interaction.reply({
                        embeds: [embed.setDescription(`Failed to kick ${member}`)]
                    });
                })
            }
                break;
            case "Ban": {
                member.ban({ reason: `Banned by ${interaction.user.tag} | Your account is suspicious or is too new for this server` }).then(() => {
                    interaction.reply({
                        embeds: [embed.setDescription(`${member} has been banned`)]
                    });
                }).catch(() => {
                    interaction.reply({
                        embeds: [embed.setDescription(`Failed to ban ${member}`)]
                    });
                })
            }
                break;

        }
    }
}