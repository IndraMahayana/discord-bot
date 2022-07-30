const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Member Banned')
        .setDefaultMemberPermissions(0)
        .addUserOption(option => 
            option
                .setName('target')
                .setDescription('Select a user')
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName('deletemsg')
                .setDescription('Delete Message History')
                .addChoices(
                    { name: 'Dont delete any', value: '0' },
                    { name: 'Previous 7 days', value: '7' },
                )
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName('reason')
                .setDescription('Provide a reason')),
	async execute(interaction) {
		const target = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason');
		const deletemsg = interaction.options.getString('deletemsg');

        if (target.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: `I cant ban this user - this user have administrator permissions`})
        } else if (target.id == interaction.user.id) {
            return interaction.reply({ content: `You cant ban yourself`, ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setColor('#ed5878')
        .setTitle('Member Banned')
        .setDescription(`This ${target} member has been banned`)
        .addFields(
            { name: 'Reason', value: `${reason || `no reason`}`, inline: true },
            { name: 'Banned by', value: `<@${interaction.member.id}>`, inline: true },
        )
        .setThumbnail(`${target.displayAvatarURL({ dynamic: true })}`)
        
        target.ban({ days: deletemsg, reason: reason })
        await interaction.reply({ embeds: [embed] });
	},
}