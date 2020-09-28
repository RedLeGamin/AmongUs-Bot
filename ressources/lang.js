const langData = require('./lang.json')

module.exports = class translation {
  constructor(lang, msg, variables) {
    var locale = langData[lang][msg]
  }
};
