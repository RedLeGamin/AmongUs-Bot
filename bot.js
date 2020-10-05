const Discord = require("discord.js");
const prefix = require("./config.json").prefix;
const getGame = require("./ressources/getGame");
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const express = require("express");
const http = require("http");
var app = express();
const socket = require("socket.io");
var serv = app.listen(4000);
const token = process.env.token;
process.env.codes = {};
const server = http.Server();
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("/code to share codes! - /help", { type: "PLAYING" });
});

client.on("presenceUpdate", (oldUser, newUser) => {
  var oldGame = getGame(oldUser);
  var newGame = getGame(newUser);
  if (newGame && newGame.stateType == "LOBBY") {
    var party = newGame.party;
    myCache.set(newGame.user, {
      code: party.code,
      size: party.size,
      maxSize: party.maxSize
    });
  }
  if (
    oldGame &&
    newGame &&
    oldGame.stateType == "LOBBY" &&
    newGame.stateType == "GAME"
  ) {
    var party = oldGame.party;
    myCache.set(newGame.user, {
      code: party.code,
      size: party.size,
      maxSize: party.maxSize
    });
  }
  if (!newGame || newGame.stateType == "MENU") {
    myCache.del(newUser.id);
  }
});

client.on("message", message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) {
    try {
      let commandFile = require(`./events/amongus.js`);
      commandFile.run(client, message, args, myCache);
    } catch (e) {
      console.log(e.message);
    }
  }
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args, { cache: myCache });
  } catch (e) {
    if (e) console.log(e.message);
  }
});

client.login(token);
