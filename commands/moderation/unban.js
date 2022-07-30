const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Member Unban')
        .setDefaultMemberPermissions(0)
        .addStringOption(option => 
            option
                .setName('userid')
                .setDescription('Provide a user id')
                .setRequired(true)),
	async execute(interaction) {
		const userid = interaction.options.getString('userid');

        const embed = new EmbedBuilder()
        .setColor('#ed5878')
        .setTitle('Member Unban')
        .setDescription(`This <@${userid}> member has been Unban`)
        .addFields({ name: 'Unban by', value: `<@${interaction.member.id}>` })

        interaction.guild.bans.fetch().then(async bans => {
            if (bans.size === 0) return interaction.reply({ content: 'No one banned in this server', ephemeral: true });

            let BannedUser = bans.find(ban => ban.user.id == userid)
            if (!BannedUser) return interaction.reply({ content: 'This user not banned', ephemeral: true });

            await interaction.guild.members.unban(BannedUser.user).catch(err => {
                return interaction.reply({ content: 'Somethink when wrong', ephemeral: true });

            }).then(() => {
                interaction.reply({ embeds: [embed] });
            })
        })
	},
}