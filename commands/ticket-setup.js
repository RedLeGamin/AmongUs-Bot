exports.run = (client, message, args, tools) => {
  console.log("Test2");
  const Discord = require("discord.js");
  const enmap = require("enmap");
  const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
  });
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
    settings.set(`${message.guild.id}-ticket`, sent.id);
  }
  p();
};
