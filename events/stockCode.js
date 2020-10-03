const getGame = require("../ressources/getGame.js");
exports.run = async (oldGame, newGame) => {
  if(!oldGame) return;
  console.log(process.env.codes)
  process.env.codes.t= "t"
  if(oldGame.stateType == "MENU" && newGame.stateType == "GAME") process.env.codes[newGame.user] = oldGame.code
  console.log(process.env.codes.t)
}