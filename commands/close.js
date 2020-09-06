const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

exports.run = (client, message, args, tools) => {
  const stepsdb = new FileSync("./data/steps.json");
  const db = low(stepsdb);
  if (!message.channel.name.includes("ticket-")) return;
  var data = db.find({ id: message.author.id }).value();
  if ( message.member.hasPermission("ADMINISTRATOR") == false || !data ) return;
  if(data) db.remove({ id: message.author.id }).write();
  message.channel.delete();
};
