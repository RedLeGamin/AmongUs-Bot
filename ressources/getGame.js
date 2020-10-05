module.exports = user => {
  var presence = user.presence;
  var game;
  if (presence.game && presence.game.applicationID == "477175586805252107")
    game = presence.game;
  else if (presence.activities) {
    for (var i = 0; i < presence.activities.length; i++) {
      if (presence.activities[i].applicationID == "477175586805252107") {
        game = presence.activities[i];
        break;
      }
    }
  }
  if (!game) return;
  var stateType;
  var state = game.state;
  // Switch statement was not working for some reason ? I never used it before so maybe i did something wrong
  /*switch (game.state) {
    case "In Lobby":
      stateType = "LOBBY";
    case "In Menus":
      stateType = "MENU";
    case "In Game":
      stateType = "GAME";
    default:
      stateType = "MENU";
  }*/
  var state = game.state ? game.state : game.details
  if (state == "In Lobby") stateType = "LOBBY";
  else if (state == "In Menus") stateType = "MENU";
  else if (state == "In Game") stateType = "GAME";
  var party = {};
  if (game.party && game.party.size) {
    party.size = game.party.size[0];
    party.maxSize = game.party.size[1];
    party.code = game.party.id;
  }
  return {
    user: user.id,
    name: game.name,
    stateType: stateType,
    state: state,
    details: game.details,
    party: party
  };
};
