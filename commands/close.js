exports.run = (client, message, args, tools) => {
  if (!message.channel.name.includes("ticket-")) return;
  message.channel.delete();
}