const Discord = require("discord.js");

exports.run = (client, message, args, tools) => {
  const embed = new Discord.RichEmbed()
    .setAuthor(
      "Among Us Bot",
      "https://media.discordapp.net/attachments/405780210265620480/758414219732451328/among-us-icon.png"
    )
    .addField(
      "/code <@someone>",
      "Get Among Us Game Info from someone or yourself"
    ).addField(
      "More commands are coming !",
      "The bot will have a lot of cool features soon ! If you would like to invite it on your server : **[Invite the Bot](https://discord.com/api/oauth2/authorize?client_id=760149228441042995&permissions=4508736&scope=bot)**"
    )
    .setColor(process.env.embedColor);
  message.channel.send(embed);
};
