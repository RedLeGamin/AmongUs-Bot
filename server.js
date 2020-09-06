const fs = require("fs");
const Discord = require("discord.js");
const prefix = require("./config.json").prefix;

const token = process.env.token;

const client = new Discord.Client();
const reactionsChannel = require("./data/reactionsChannels.json");
client.commands = new Discord.Collection();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const reactionsChanneldb = new FileSync("./data/reactionsChannels.json");

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

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(reactionsChannel);
  console.log(reactionsChanneldb);
  for (var i = 0; i < reactionsChannel.length; i++) {
    let element = reactionsChannel[i];
    let channel = await client.channels.fetch(element).catch(channel => {console.log("++")});
    if(!channel) {
      const reactionsChanneldb = new FileSync(
          "./data/reactionsChannels.json"
        );
        const dbt = low(reactionsChanneldb);
        dbt.remove(reactionsChannel[i]).write(); 
      return;
    }
    await channel.messages.fetch({ limit: 10 }).then(channel2 => {
      console.log(channel2)
      console.log(channel.name + " fetched !");
    });
  }
});

client.on("message", message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (message.author.bot) return;
  if (message.channel.name.includes("ticket-") && command !== "close") {
    console.log("tez");  
    const stepsdb = new FileSync("./data/steps.json");
    const db = low(stepsdb);
    var data = db.find({ channel: message.channel.id }).value();
    if (!db) return;
    if(data.state !== 0) return;
    var machintruc = [
      {"name": "red trop bg ?", "emoji": "💯"},
      {"name": "autre truc", "emoji" : "😎"}
    ]
    var output = ""; 
    db.find({ channel: message.channel.id }).assign({state: 1}).write();
    machintruc.forEach((element => output += element.emoji + " " + element.name + "\n"))
    message.channel.send("**Quel est le problème ?**\n\n" +output).then(message => {
      for (var i = 0; i < machintruc.length; i++) {
       message.react(machintruc[i].emoji)
    }
    });
    
      
  }
   
});

client.on("message", message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
 
  if (!message.content.startsWith(prefix)) return;
  
  if (message.author.bot) return;
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

client.on("messageReactionAdd", async (reaction, user) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();

  if (user.bot) return;

  let ticketid = await settings.get(`${reaction.message.guild.id}-ticket`);

  if (!ticketid) return;
  console.log("penis")
  if (reaction.message.id == ticketid && reaction.emoji.name == "📩") {
    const stepsdb = new FileSync("./data/steps.json");
    const db = low(stepsdb);
    console.log(db.find({ id: user.id }).value());

    if (db.find({ id: user.id }).value()) return;
    reaction.users.remove(user);

    reaction.message.guild.channels
      .create(`ticket-${user.username}`, {
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
        type: "text"
      })
      .then(async channel => {
        db.push({ id: user.id, channel: channel.id, state: 0 }).write();
        await channel.send(
          `<@${user.id}>`,
          new Discord.MessageEmbed()
            .setTitle("Ticket")
            .setDescription(
              `**👋 Salut ${user.username} !**\nPour fermer le ticket, merci de faire la commande : /close\n\n`
            )
            .setColor("00ff00")
        );
        channel.send("Quel est-ton pseudo Minecraft ?");
        const reactionsChanneldb = new FileSync(
          "./data/reactionsChannels.json"
        );
        const dbt = low(reactionsChanneldb);
        dbt.push(channel.id).write();
      });
  }
});

client.login(token);
