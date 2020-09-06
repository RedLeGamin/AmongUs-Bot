const fs = require("fs");
const Discord = require("discord.js");
const prefix = require("./config.json").prefix;

const token = process.env.token;

const client = new Discord.Client();
const reactionsChannel = require("./data/reactionsChannels.json");
client.commands = new Discord.Collection();

 const enmap = require("enmap");
  const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
  });

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(reactionsChannel)
  reactionsChannel.forEach(element =>  {
    
    let channel = await client
      .channels.get(element);
    channel.fetchMessages({ limit: 10 }).then(channel => {console.log(channel.name + " fetched")});
  });
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
            type: 'text'
        }).then(async channel => {
            channel.send(`<@${user.id}>`, new Discord.MessageEmbed().setTitle("-").setDescription("-").setColor("00ff00"))
        })
    }
});

client.login(token);
