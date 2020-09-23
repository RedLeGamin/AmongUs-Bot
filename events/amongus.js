exports.run = (client, message, args, tools) => {
  console.log(message.content.length)
  console.log(message.content.slice(-1))
  console.log(["Q","N"].includes(message.content.slice(-1)))
  if(message.content.length != 6 && ["Q","N"].includes(message.content.slice(-1)) == false) return;
  else message.reply("Among us !")
}