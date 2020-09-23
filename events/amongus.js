const Discord = require("discord.js");

exports.run = async (client, message, args, tools) => {
  if (
    message.content.length != 6 ||
    ["Q", "N"].includes(message.content.slice(-1)) == false
  )
    return;
  await message.channel.send(
    " ",
    new Discord.MessageEmbed()
      .setAuthor(
        "Partie Among Us",
        "https://media.discordapp.net/attachments/405780210265620480/758414219732451328/among-us-icon.png"
      )
      .addField("Code de la partie <:Liste:410856444813115393>", "`" + message.content + "`", true)
      .addField("Dernier Crack du jeu", "[Lien médiafire](https://google.com)", true)
      .setColor("fcda42")
  );
};
