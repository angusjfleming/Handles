const hssql = require("hearthstone-sql");
exports.run = (bot, msg, params = []) => {
    hssql.fetchdata(bot.mashapekey)
    .then(() => {
        hssql.importcards().then(() => {
        msg.channel.send("Sucessfully retrieved card information.")
        })
    })
};

exports.help = {
    name: "fetchcardinfo",
    description: "fetches card info the hs card command.",
    usage: "fetchcardinfo"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 4
};
