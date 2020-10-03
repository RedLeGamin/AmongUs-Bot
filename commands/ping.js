
const getGame = require("../ressources/getGame")

exports.run = (client, message, args, tools) => {
  console.log(process.env.test)
  message.channel.send("pong")
}