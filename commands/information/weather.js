const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Get weather information')
        .addStringOption(option => 
            option
                .setName('target')
                .setDescription('select a location')
                .setRequired(true)),
	async execute(interaction) {
        const location = interaction.options.getString('target');
		weather.find({search: `${location}`, degreeType: `C`}, function (error, result) {

            if(result === undefined || result.length === 0) return interaction.reply('**invlaid** location!!');

            var current = result[0].current;
            var location = result[0].location;

            const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addFields(
                { name: 'TimeZone', value: `UTC ${location.timezone}`, inline: true },
                { name: 'Degree Type', value: `Celcius`, inline: true },
                { name: 'Temperature', value: `${current.temperature}°`, inline: true },
                { name: 'Wind', value: `${current.winddisplay}`, inline: true },
                { name: 'Feels Like', value: `${current.feelslike}°`, inline: true },
                { name: 'Humidity', value: `${current.humidity}%`, inline: true }
            )

            interaction.reply({ embeds: [embed] });
        })    
	},
}