const fs = require("fs");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const enmap = require('enmap');


const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true
});
const reactionsChanneldb = new FileSync('./data/reactionsChannels.json')
const db = low(reactionsChanneldb)
exports.run = (client, message, args, tools) => {
  if ( message.member.hasPermission("ADMINISTRATOR") == false ) return;
  console.log("Test2");
  const Discord = require("discord.js");
  
  let channel = message.mentions.channels.first();
  if (!channel) return message.reply("`!ticket-setup #channel`");
  async function p() {
    let sent = await channel.send(
      new Discord.MessageEmbed()
        .setTitle("Systeme Ticket")
        .setDescription("Réagir sur 📩 pour ouvrir un ticket!")
        .setColor("00ff00")
    );
    db.push(message.channel.id).write();
    sent.react("📩");
     settings.set(`${message.guild.id}-ticket`, sent.id);
  }
  p();
};
