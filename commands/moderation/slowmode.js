const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slowmode')
		.setDescription('Slowmode channel')
        .setDefaultMemberPermissions(0)
        .addNumberOption(option => 
            option
                .setName('number')
                .setDescription('Provide a number')
                .setRequired(true)),
	async execute(interaction) {
		const number = interaction.options.getNumber('number');

        interaction.channel.setRateLimitPerUser(number); {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`Set the slowmode of this channel too **${number} seconds**`)
            interaction.reply({ embeds: [embed] });
        }
	},
}