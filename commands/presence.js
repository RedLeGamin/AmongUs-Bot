const Discord = require("discord.js");
exports.run = (client, message, args, tools) => {
  message.channel.send("pong")
  console.log(message.author.presence)
}