const parse = require("parse-duration")
const humanizeDuration = require("humanize-duration")
const fs = require("fs")
const moment = require("moment")
moment().format();
exports.run = (bot, msg, params = []) => {
    var fileid = bot.funcs.randomstring(32, "aA")
    var currentDate = new Date();
    if (!isNumeric(params[0])) {
        return msg.channel.send("Sorry, you didn't enter a valid quantity of time.");
    }
    var time = parse(params[0]);
    params.shift();
    var reminder = params.join(" ");
    if (reminder == "") {
        reminder = "Nothing"
        if (msg.author.id == "83939627005673472") {
            reminder = "Pizza"
        }
    }
    msg.channel.send(`I'll remind you of \`${reminder}\` in ${humanizeDuration(time)}.`);
    var obj = {
        "time": new Date(currentDate.getTime() + time),
        "userid": msg.author.id,
        "channelid": msg.channel.id,
        "guildid": msg.guild.id,
        "message": reminder,
        "datesent": moment().format("MMMM Do YYYY, h:mm a"),
        "reminderid": fileid
    }
    fs.writeFileSync(`./reminders/${fileid}.json`, JSON.stringify(obj));
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
