const Discord = require("discord.js");
const linkCrack = require("../config.json").linkCrack;

exports.run = (client, message, args, tools) => {
  return;
  var member = args[0];
  if (!member) member = message.author;
  else {
    member = message.mentions.users.first();

    if (member) member = message.guild.members.get(member.id);
    if (!member) member = message.guild.members.get(args[0]);
    if (!member) return message.reply("Membre introuvable");
  }
  var game = member.presence.game;
  if (!game || game.name != "Among Us")
    return message.reply(member + " ne joue pas à Among Us");
  var party = game.party;

  if (!party || !party.size || !party.size[1])
    return message.reply(member + " n'est pas en partie");
  const embed = new Discord.RichEmbed()
    .setAuthor(
      "Partie Among Us - Partie de " + member.tag,
      "https://media.discordapp.net/attachments/405780210265620480/758414219732451328/among-us-icon.png"
    )
    .addField(
      "Code de la partie <:Liste:410856444813115393>",
      "`" + game.party.id + "`",
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

  embed.addField(
    "Place",
    `${party.size[0]}/${party.size[1]} <:Liste:410856444813115393>`,
    true
  );
  embed.addField("Status", game.details, true);
  message.channel.send(embed);
};
