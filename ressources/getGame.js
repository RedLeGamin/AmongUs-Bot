
module.exports = class game {
  constructor(user) {
    if(!user.presence)  throw console.error("Aucune presence");
    this.state = 1;
  }
};
