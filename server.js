const fs = require("fs");
const Discord = require("discord.js");
const prefix = require("./config.json").prefix;

const token = process.env.token;

const client = new Discord.Client();
const reactionsChannel = require("./data/reactionsChannels.json");
client.commands = new Discord.Collection();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const reactionsChanneldb = new FileSync('./data/reactionsChannel.json')

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

client.on("ready", async () => {
      console.log(`Logged in as ${client.user.tag}!`);
      console.log(reactionsChannel);
      console.log(reactionsChanneldb);
      for (var i = 0; i < reactionsChannel.length; i++) {
        let element = reactionsChannel[i];
        let channel = await client.channels.fetch(element);
        channel.messages.fetch({ limit: 10 }).then(fetchedChannel => {});
      }
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e.message);
  }
});

function log(eventName, options = {}) {
  message.channel.send();
}

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (oldMember.premiumSince != null && newMember.premiumSince == null)
    log("boost-end", { user: newMember.user });
  else if (oldMember.premiumSince == null && newMember.premiumSince != null)
    log("boost-start", { user: newMember.user });
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('messageReactionAdd', async (reaction, user) => {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();

    if(user.bot) return;

    let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

    if(!ticketid) return;

    if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
        reaction.users.remove(user);

        reaction.message.guild.channels.create(`ticket-${user.username}`, {
            permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }
            ],
            topic: user.id,
            type: 'text'
        }).then(async channel => {
            channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("-").setDescription("-").setColor("00ff00"))
        })
    }
});

client.login(token);
