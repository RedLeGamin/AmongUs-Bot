const Discord = require("discord.js");
const linkCrack = require("../config.json").linkCrack;
exports.run = async (client, message, args, tools) => {
  console.log(message.content);
  if (
    message.content.length != 6 ||
    ["Q", "N"].includes(message.content.slice(-1)) == false
  )
    return;

  const embed = new Discord.RichEmbed()
    .setAuthor(
      "Partie Among Us - Invite de " + message.author.tag,
      "https://media.discordapp.net/attachments/405780210265620480/758414219732451328/among-us-icon.png"
    )
    .addField(
      "Code de la partie <:Liste:410856444813115393>",
      "`" + message.content.toUpperCase() + "`",
      true
    )
    .addField(
      "Dernier Crack du jeu",
      "[Lien médiafire](" + linkCrack + ")",
      true
    )
    .setColor("fcda42")
    .setImage(
      "https://cdn.discordapp.com/attachments/429158600720515077/758741106258608158/unknown.png"
    );
  var game = message.author.presence.game;
  if (game) {
    var party = game.party;
    if(!party || !party.size || !party.size[1] || !game.details) return;
    embed.addField("Place", `${party.size[0]}/${party.size[1]} <:Liste:410856444813115393>`, true);  
    embed.addField("Status", game.details, true);
  }
  message.channel.send(embed);
};
