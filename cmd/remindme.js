const parse = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const fs = require('fs')
const moment = require('moment')
moment().format()
exports.run = (bot, msg, params = []) => {
    var currentDate = new Date();
    msg.delete(30000)
    if (!isNumeric(params[0])) {
        return msg.channel.send(`Sorry, you didn't enter a valid quantity of time.`).then(m => {
            setTimeout(m.delete.bind(m), 30000)
        })
    }
    var time = parse(params[0]);
    params.shift();
    var reminder = params.join(" ")
    if (!reminder) {
        msg.reply(`I'll remind you in ${humanizeDuration(time)}.`).then(m => {
            setTimeout(m.delete.bind(m), 30000)
        })
        var obj = {
            "time": new Date(currentDate.getTime() + time),
            "userid": msg.author.id,
            "channelid": msg.channel.id,
            "guildid": msg.guild.id,
            "datesent": moment().format('MMMM Do YYYY, h:mm a')
        }
        fs.writeFileSync(`./reminders/${bot.funcs.randomstring(32, "aA")}.json`, JSON.stringify(obj))
    } else {
        msg.reply(`I'll remind you of \`${reminder}\` in ${humanizeDuration(time)}.`).then(m => {
            setTimeout(m.delete.bind(m), 30000)
        })
        var obj = {
            "time": new Date(currentDate.getTime() + time),
            "userid": msg.author.id,
            "channelid": msg.channel.id,
            "guildid": msg.guild.id,
            "message": reminder,
            "datesent": moment().format('MMMM Do YYYY, h:mm a')
        }
        fs.writeFileSync(`./reminders/${bot.funcs.randomstring(32, "aA")}.json`, JSON.stringify(obj))
    }
};

function isNumeric(n) {
    return !isNaN(parseFloat(n));
}

function reply(msg, reminder) {
    if (!reminder) {
        return msg.reply(`reminding you from ${msg.createdAt}`)
    } else {
        return msg.reply(`reminding you of \`${reminder}\` from ${msg.createdAt}`)
    }

};

exports.help = {
    name: `remindme`,
    description: `Reminds you in x of y`,
    usage: `remindme`
};

exports.conf = {
    enabled: true,
    aliases: ['remind', 'settimer'],
    permLevel: 1
};