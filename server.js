const fs = require('fs');
const Discord = require('discord.js');
const prefix = require('./config.json').prefix;

const token = process.env.token;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
console.log(token)
client.login(token)