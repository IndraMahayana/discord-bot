const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Member kick')
        .setDefaultMemberPermissions(0)
        .addUserOption(option => 
            option
                .setName('target')
                .setDescription('select a user')
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName('reason')
                .setDescription('Provide a reason')),
	async execute(interaction) {
		const target = interaction.options.getMember('target');
		const reason = interaction.options.getString('reason');

        if (target.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: `I cant ban this user - this user have administrator permissions`})
        } else if (target.id == interaction.user.id) {
            return interaction.reply({ content: `You cant kick yourself`, ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setColor('#ed5878')
        .setTitle('Member Kick')
        .setDescription(`This ${target} member has been kick`)
        .addFields(
            { name: 'Reason', value: `${reason || `no reason`}`, inline: true },
            { name: 'Banned by', value: `<@${interaction.member.id}>`, inline: true },
        )
        .setThumbnail(`${target.displayAvatarURL({ dynamic: true })}`)
        
        target.kick();
        await interaction.reply({ embeds: [embed] });
	},
}