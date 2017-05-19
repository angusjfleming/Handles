var hex = "00ffff";
const jsonQuery = require('json-query')
const FuzzySet = require('fuzzyset.js')
exports.run = (bot, msg, params = []) => {
  baseparams = params.join(" ")
  params = params.join(" ")
  fuzzy = FuzzySet(bot.cardnames)
  var fuzzyout = fuzzy.get(params)
  fuzzyout[0][1] = fuzzyout[0][1]
  console.log(fuzzyout[0][1])

if (!fuzzyout[0][1]){
  msg.reply(`Could not find card: ${baseparams}, please try again.`)
  return;
}

if (true) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Basic"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Classic"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Promo"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Reward"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Naxxramas"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Goblins vs Gnomes"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Blackrock Mountain"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["The Grand Tournament"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["The League of Explorers"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Whispers of the Old Gods"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["One Night in Karazhan"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Mean Streets of Gadgetzan"]
  }).value
}
if (!out) {
    var out = jsonQuery(`[name=${fuzzyout[0][1]} & type!=Hero]`, {
    data: bot.cardinfo["Journey to Un'Goro"]
  }).value
} 

if (!out) (
  msg.reply(`Could not find card: ${baseparams}, please try again.`)
)
if (out){
    var stats = ""
    if (out.type == "Minion") {
        stats = `${out.cost} mana ${out.attack}/${out.health}`
    }
    if (out.type == "Spell") {
        stats = `${out.cost} mana`
    }
var embed = {
        "title": `${out.name}`,
    "url": "http://hearthstone.gamepedia.com/Hearthstone_Wiki",
    "color": 32767,
    "timestamp": msg.createdAt,
    "footer": {
      "text": (out.flavor ? out.flavor : "")
    },
    "image": {
      "url": out.imgGold
    },
    "fields": [
      {
        "name": "Info",
        "value": `${stats}\nRarity: **${out.rarity}**`
      },
      {
        "name": "Set",
        "value": out.cardSet
      },
      {
        "name": "Card text",
        "value": (out.text ? out.text : "None")
      }
    ]
    }
console.log(out)
msg.channel.send("", {
        embed
    }).catch(err => msg.reply(err));
}
};

exports.help = {
    name: "hscards",
    description: "Tries to find hearthstone card matching your query.",
    usage: "hscards <card name>"
};

exports.conf = {
    enabled: true,
    aliases: ['card', 'hs'],
    permLevel: 1
};
