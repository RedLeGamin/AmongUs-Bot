const Discord = require("discord.js");
const bg = require("../ressources/randomBg.js");
const linkCrack = require("../config.json").linkCrack;
const getGame = require("../ressources/getGame.js");
exports.run = async (client, message, args, tools) => {
  if (
    message.content.length != 6 ||
    ["Q", "N"].includes(message.content.slice(-1)) == false
  )
    return;

  const embed = new Discord.RichEmbed()
    .setAuthor(
      message.author.username + "'s Among Us Game",
      "https://media.discordapp.net/attachments/405780210265620480/758414219732451328/among-us-icon.png"
    )
    .addField(
      "Game code <:Liste:410856444813115393>",
      "`" + message.content.toUpperCase() + "`",
      true
    )
    .setColor("fcda42")
    .setImage(bg());
  var game = getGame(message.author);
  if (game) {
    var party = game.party;
    if (!party) return;
    embed.addField(
      "Place",
      `${party.size}/${party.maxSize} <:Liste:410856444813115393>`,
      true
    );
    embed.addField("Status", game.state, true);
  }
  message.channel.send(embed);
};
