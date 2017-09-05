var hex = "BF5FFF";
const hssql = require("hearthstone-sql")
const toMarkdown = require("to-markdown");
const sql = require("sqlite")
exports.run = (bot, msg, params = []) => {
    sql.open(hssql.dbpath, {
            Promise
        })
        .then(carddb => {
            carddb.get("SELECT * FROM cardinfo WHERE name LIKE (?) AND NOT (rarity = (?) and type = (?)) AND type <> (?)", ["%" + params.join(" ") + "%", "Free", "Hero", "Enchantment"]).then(row => {
                if (row) {
                    var stats = ""
                    if (row.type == "Minion") {
                        stats = `${row.cost} mana ${row.attack}/${row.health}`
                    }
                    if (row.type == "Spell") {
                        stats = `${row.cost} mana`
                    }
                    if (row.cardText) {
                    row.cardText = row.cardText.replace(/\\n_/g, " ")
                    row.cardText = row.cardText.replace(/\\n/g, " ")
                    row.cardText = row.cardText.replace(/\[x]/g, " ")
                    row.cardText = row.cardText.replace(/\_/g, " ")
                    }
                    var embed = {
                        "title": `${row.name}`,
                        "url": "http://hearthstone.gamepedia.com/Hearthstone_Wiki",
                        "color": 32767,
                        "timestamp": msg.createdAt,
                        "footer": {
                            "text": (row.flavor ? row.flavor : "")
                        },
                        "image": {
                            "url": row.img
                        },
                        "fields": [{
                                "name": "Info",
                                "value": `${stats}\nRarity: **${row.rarity}**`
                            },
                            {
                                "name": "Set",
                                "value": row.cardSet
                            },
                            {
                                "name": "Card text",
                                "value": (row.cardText ? toMarkdown(row.cardText) : "None")
                            }
                        ]
                    }
                    msg.channel.send("", {
                        embed
                    }).catch(err => msg.reply(err));
                } else {
                    return msg.channel.send(`Could not find card: ${params.join(" ")}, please try again.`)
                }
                sql.close()
            })
        })
};

exports.help = {
    name: "hscards",
    description: "Tries to find a hearthstone card matching your query.",
    usage: "hscards <card name>"
};

exports.conf = {
    enabled: true,
    aliases: ['card'],
    permLevel: 1
};