const Discord = require("discord.js")
const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});
exports.run = (client, message, args, tools) =>
  async function() {
    let channel = message.mentions.channels.first();
    if (!channel) return message.reply("Usage: `!ticket-setup #channel`");

    let sent = await channel.send(
      new Discord.MessageEmbed()
        .setTitle("Ticket System")
        .setDescription("React to open a ticket!")
        .setFooter("Ticket System")
        .setColor("00ff00")
    );

    sent.react("🎫");
    settings.set(`${message.guild.id}-ticket`, sent.id);

    message.channel.send("Ticket System Setup Done!");
  };
