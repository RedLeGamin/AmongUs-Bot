const fs = require("fs");

exports.run = (client, message, args, tools) => {
  console.log("Test2");
  const Discord = require("discord.js");
  
  let channel = message.mentions.channels.first();
  if (!channel) return message.reply("`!ticket-setup #channel`");
  async function p() {
    let sent = await channel.send(
      new Discord.MessageEmbed()
        .setTitle("Systeme Ticket")
        .setDescription("Réagir sur 📧 pour ouvrir un ticket!")
        .setFooter("wsh xblackouille")
        .setColor("00ff00")
    );

    sent.react("🎫");
    
  }
  p();
};
