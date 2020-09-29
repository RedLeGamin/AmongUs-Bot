const Discord = require("discord.js");
const prefix = require("./config.json").prefix;
const getGame = require("./ressources/getGame")

const token = process.env.token;
const usersTracked = [];
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) {
    try {
      let commandFile = require(`./events/amongus.js`);
      commandFile.run(client, message, args);
    } catch (e) {
      console.log(e.message);
    }
  }
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e.message);
  }
});

client.login(token);
