const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('imdb')
		.setDescription('Get movie or series information')
        .addStringOption(option => 
            option
                .setName('target')
                .setDescription('Provide a movie or series')
                .setRequired(true)),
	async execute(interaction) {
        const imdb = interaction.options.getString('target');

        let movie = await axios(`https://www.omdbapi.com/?apikey=4be933fd&t=${imdb}`);
        if (!movie || !movie.data || movie.data.Response === 'False') return interaction.reply({
            content: `Unable to find something about ${imdb}`, ephemeral: true
        });
        movie = movie.data;

        let embed = new EmbedBuilder()
            .setTitle(`${movie.Title} ${movie.Year}`)
            .setColor('Random')
            .setThumbnail(`${movie.Poster}`)
            .setDescription(`${movie.Plot}`)
            .addFields(
                { name: 'Country', value: `${movie.Country}`, inline: true },
                { name: 'Languages', value: `${movie.Language}`, inline: true },
                { name: 'Type', value: `${movie.Type}`, inline: true },
                { name: 'Actors', value: `${movie.Actors}`, inline: true },
                { name: 'Genre', value: `${movie.Genre}`, inline: true },
                { name: 'Runtime', value: `${movie.Runtime}`, inline: true },
                { name: 'Ratings', value: `${movie.imdbRating}`, inline: true },
                { name: 'Seasons', value: `${movie.totalSeasons}`, inline: true },
                { name: 'Released', value: `${movie.Released}`, inline: true },
            )

        await interaction.reply({ embeds: [embed]});
	},
}