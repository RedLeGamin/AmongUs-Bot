const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const reactionsChanneldb = new FileSync("./data/reactionsChannels.json");

exports.run = (client, message, args, tools) => {
  const stepsdb = new FileSync("./data/steps.json");
  const db = low(stepsdb);
  if (!message.channel.name.includes("ticket-")) return;
  var data = db.find({ id: message.author.id }).value();
  if (message.member.hasPermission("ADMINISTRATOR") == false && !data) return;
  if (data) {
    
    const reactionsChanneldb = new FileSync("./data/reactionsChannels.json");
    const dbt = low(reactionsChanneldb);
    dbt.remove(data.channel).write();
    db.remove({ id: message.author.id }).write();
  }
  message.channel.send("✅ **Compris !** Ce channel sera supprimé dans 10 secondes !").then( message => {setTimeout(function() {
    message.channel.delete();
}, 10000);})
  

  
};
