const defineWord = require('define-word');

exports.run = (bot, msg, params = []) => {
    if (!params[0]) return;
    var word = params[0]
    var defined = defineWord.define(word)
    if (defined.definitions[0] == null) {
        return msg.channel.send(`Sorry, I could not define ${word}.`);
    } else {
        defined.definitions = defined.definitions.clean("")
        var constructedstring = (`${word} : ${defined.type} | ${defined.definitions[0]}`);
        var embed = {
            "title": `${word}`,
            "description": `${defined.type}`,
            "color": parseInt("FFFFFF", 16),
            "fields": [{
                    "name": "Definition",
                    "value": `${defined.definitions[0]}`
                }
            ]
        }
        return msg.channel.send("", {
            embed
        }).catch(err => msg.reply(err));
    }

};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


exports.help = {
    name: "define",
    description: "Defines a word.",
    usage: "define <word>"
};

exports.conf = {
    enabled: true,
    aliases: ["def", "definition", "dict", "dictionary"],
    permLevel: 1
};
