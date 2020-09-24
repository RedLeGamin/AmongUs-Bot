const Discord = require("discord.js");
exports.run = (client, message, args, tools) => {
  if (!args[0]) return message.reply(".code @someone");
  var member = args[0];

  member = message.mentions.users.first();

  if (member) member = message.guild.members.get(member.id);
  if (!member) member = message.guild.members.get(args[0]);
  if (!member) return message.reply("Membre introuvable");

  
  var game = message.author.presence.game;
  if (!game || game.name !="Among Us") return 
    var party = game.party;
    embed.addField("Place", `${party.size[0]}/${party.size[1]}`);
  
  
    if (!party || !party.size || !party.size[1]) return;
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
    .setColor("fcda42");
  
  message.channel.send(embed);
};
