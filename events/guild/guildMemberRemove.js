const { GuildMember, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'guildMemberRemove',
    /**
     * 
     * @param {GuildMember} member
     * @param {GuildMember} client
     */
    async execute(member, client) {
        const guildConfig = client.guildConfig.get(member.guild.id);
        if(!guildConfig) return;

        const logChannel = (await member.guild.channels.fetch()).get(guildConfig.logChannel);
        if(!logChannel) return;

        const accountCreation = parseInt(member.user.createdTimestamp / 1000);

        const embed = new EmbedBuilder()
        .setAuthor({ name: `${member.user.tag} | ${member.id}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
        .setDescription([
            `- User: **${member.user}**`,
            `- Account Type: **${member.user.bot ? "Bot" : "User"}**`,
            `- Account Creation: <t:${accountCreation}:D> | <t:${accountCreation}:R>`
        ].join("\n"))
        .setFooter({ text: `User left`})
        .setTimestamp();

        logChannel.send({ embeds: [embed] });
    }
}