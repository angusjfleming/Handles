var parse = require("parse-duration")
var humanizeDuration = require("humanize-duration")
//var dehumanize = require("dehumanize-date")
var parsemessy = require('parse-messy-time')
var fs = require("fs")
var moment = require("moment")
moment().format();
exports.run = (bot, msg, params = []) => {
    var fileid = bot.funcs.randomstring(32, "aA")
    var currentDate = new Date();
    /*if (!isNumeric(params[0])) {
        return msg.channel.send("Sorry, you didn't enter a valid quantity of time.");
    }*/
    var time = 0;
    time = parsemessy(params[0])
    console.log(new Date() > time)
    console.log(new Date())
    console.log(time)

    if (new Date() > time) {
    time = new Date(currentDate.getTime() + parse(params[0]))
    }
    try {
    params.shift();
    var reminder = params.join(" ");
    if (reminder == "") {
        reminder = "Nothing"
    }
        msg.channel.send(`I'll remind you of \`${reminder}\` in ${humanizeDuration(new Date() - time)}.`);
        var obj = {
            "time": time,
            "userid": msg.author.id,
            "channelid": msg.channel.id,
            "guildid": msg.guild.id,
            "message": reminder,
            "datesent": moment().format("MMMM Do YYYY, h:mm a"),
            "reminderid": fileid
        }
        fs.writeFileSync(`./reminders/${fileid}.json`, JSON.stringify(obj));
    } catch (e) {
        msg.channel.send("Sorry, you didn't enter a valid quantity of time.");
    }
};

function isNumeric(n) {
    return !isNaN(parseFloat(n));
}


exports.help = {
    name: "remindme",
    description: "Reminds you in x of y",
    usage: "remindme"
};

exports.conf = {
    enabled: true,
    aliases: ["remind", "settimer"],
    permLevel: 1
};