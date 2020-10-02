const Discord = require("discord.js");
const bg = require("../ressources/randomBg.js")
const linkCrack = require("../config.json").linkCrack;
exports.run = async (client, message, args, tools) => {
  if (
    message.content.length != 6 ||
    ["Q", "N"].includes(message.content.slice(-1)) == false
  )
    return;

  const embed = new Discord.RichEmbed()
    .setAuthor(
      message.author.username+ "'s Among Us Game",
      "https://media.discordapp.net/attachments/405780210265620480/758414219732451328/among-us-icon.png"
    )
    .addField(
      "Game code <:Liste:410856444813115393>",
      "`" + message.content.toUpperCase() + "`",
      true
    )
    .setColor("fcda42")
    .setImage(
      bg()) 
  var game = message.author.presence.game;
  if (game) {
    var party = game.party;
    if(!party || !party.size || !party.size[1] || !game.details) return;
    embed.addField("Place", `${party.size[0]}/${party.size[1]} <:Liste:410856444813115393>`, true);  
    embed.addField("Status", game.details, true);
  }
  message.channel.send(embed);
};
