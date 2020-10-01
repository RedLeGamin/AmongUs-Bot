const Discord = require('discord.js')

exports.run = (client, message, args, tools) => {
  const embed = new Discord.RichEmbed()
    .setAuthor(
      'Among Us Bot',
      "https://media.discordapp.net/attachments/405780210265620480/758414219732451328/among-us-icon.png"
    )
    .addField(
      "Commands",
      "/code <@someone>"
    )
    .setColor(process.env.embedColor)
  embed.addField("Status", game.status, true);
  message.channel.send(embed);
}