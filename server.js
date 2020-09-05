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

client.on('message', message => {
  
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
  try {
    let commandFile = require(`./commands/${command}.js`)
    commandFile.run(client,message,args)
  } catch (e) 
  {
    console.log(e.message)  
  }

});


client.on('guildMemberUpdate', (oldMember, newMember) => {
  if(oldMember.premiumSince != null && newMember.premiumSince == null) log("boost-end")
  else if(oldMember.premiumSince != null && newMember.premiumSince == null) log("boost-start", u)
})

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
console.log(token)
client.login(token)