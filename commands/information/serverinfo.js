const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Get server info'),
	async execute(interaction) {
		const { guild } = interaction 

        const embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(`${guild.name} server information`)
        .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
        .addFields(
                { name: 'Server Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Server ID', value: `${guild.id}`, inline: true },
                { name: 'Server Creation Date', value: `${guild.createdAt.toDateString()} at ${guild.createdAt.toTimeString()}`, inline: true },
                { name: 'Total member', value: `${guild.memberCount}`, inline: true },
                { name: 'Highest Role', value: `${guild.roles.highest}`, inline: true },
                { name: 'Server Boost', value: `Boost Count : ${guild.premiumSubscriptionCount}\nBoost Level : ${guild.premiumTier}`, inline: true },
                { name: 'Channel & Caterogy', value: `Channel : ${guild.channels.cache.filter(channel => channel.type == 'GUILD_TEXT').size}
                Voice : ${guild.channels.cache.filter(channel => channel.type == 'GUILD_VOICE').size}
                Announcement : ${guild.channels.cache.filter(channel => channel.type == 'GUILD_NEWS').size}
                Caterogy : ${guild.channels.cache.filter(channel => channel.type == 'GUILD_CATEGORY').size}`, inline: true }
            )
                
        await interaction.reply({ embeds: [embed] });
	},
}