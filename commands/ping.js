
const getGame = require("../ressources/getGame")

exports.run = (client, message, args, tools) => {
  message.channel.send("pong")
  console.log(new getGame(message.author.presence))
}