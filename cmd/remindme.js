const parse = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const fs = require('fs')
exports.run = (bot, msg, params = []) => {
    var currentDate = new Date();
    msg.delete()
    if (!isNumeric(params[0])) {
        msg.channel.send(`Sorry, you didn't enter a valid quantity of time.`).then(m => {
            setTimeout(m.delete.bind(m), 10000)
        })
        return;
    }
    var time = parse(params[0]);
    if (!isNaN(time) && params[1] && parse(params[1]) > 500) {
        time = time + parse(params[1]);
        params.shift()
    }
    params.shift();
    var reminder = params.join(" ")
    if (!reminder) {
        msg.reply(`I'll remind you in ${humanizeDuration(time)}.`).then(m => {
            setTimeout(m.delete.bind(m), 10000)
        })
        var obj = {"time": new Date(currentDate.getTime() + time), "authorid": msg.author.id}
        fs.writeFileSync(`./reminders/${bot.funcs.randomstring(32, "aA")}.json`, JSON.stringify(obj))
    } else {
        msg.reply(`I'll remind you of \`${reminder}\` in ${humanizeDuration(time)}.`).then(m => {
            setTimeout(m.delete.bind(m), 10000)
        })
        var obj = {"time": new Date(currentDate.getTime() + time), "authorid": msg.author.id, "message" : reminder}
        fs.writeFileSync(`./reminders/${bot.funcs.randomstring(32, "aA")}.json`, JSON.stringify(obj))
    }
    /*setTimeout(function() {
        reply(msg, reminder);
    }, time);*/

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