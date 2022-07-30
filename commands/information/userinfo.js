const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('getuserinfo')
        .addUserOption(option => 
            option
                .setName('target')
                .setDescription('select a user')
                .setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getUser('target');

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('User Info')
        .addFields(
            { name: 'Mention', value: `<@${target.id}>`, inline: true },
            { name: 'Username', value: `${target.tag}`, inline: true },
            { name: 'User id', value: `${target.id}` },
            { name: 'Account Create', value: `${moment.utc(target.createdAt).format('LLLL')}` },
            { name: 'Member Joined', value: `${moment.utc(target.joinedAt).format('LLLL')}` }
        )
        .setThumbnail(target.avatarURL({ dynamic: true }))
        
        await interaction.reply({ embeds: [embed] });
	},
}