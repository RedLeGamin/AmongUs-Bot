exports.run = (client, message, args, tools) => {
  console.log(message.content.length)
  if(message.length != 6) return;
  else message.reply("Among us !")
}