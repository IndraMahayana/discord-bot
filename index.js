const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const fs = require("fs");

const commands = [];
client.commands = new Collection();

const commandsFolder = fs.readdirSync('./commands');
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
	    commands.push(command.data.toJSON());
	    client.commands.set(command.data.name, command);
    }
}

const eventsFolder = fs.readdirSync('./events');
for (const folder of eventsFolder) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of eventFiles) {
	    const event = require(`./events/${folder}/${file}`);
	    if (event.once) {
		    client.once(event.name, (...args) => event.execute(...args, commands));
	    } else {
		    client.on(event.name, (...args) => event.execute(...args, commands));
	    }
    }
}

client.login(token);