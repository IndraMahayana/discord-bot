const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Delete Message')
        .setDefaultMemberPermissions(0)
        .addNumberOption(option => 
            option
                .setName('number')
                .setDescription('Provide a number 1 - 99')
                .setMinValue(1)
                .setMaxValue(99)
                .setRequired(true)),
	async execute(interaction) {
        const number = interaction.options.getNumber('number');
    
        const amount = parseInt(number) + 1;

        interaction.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            interaction.reply({ content: 'error trying to prune messages in this channel!', ephemeral: true });
        });

        await interaction.reply({ content: `Successfully delete ${number} message in this channel`, ephemeral: true });
	},
}