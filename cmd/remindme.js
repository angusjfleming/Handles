var parse = require('parse-duration')
var humanizeDuration = require('humanize-duration')
exports.run = (bot, msg, params = []) => {
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
    } else {
        msg.reply(`I'll remind you of \`${reminder}\` in ${humanizeDuration(time)}.`).then(m => {
            setTimeout(m.delete.bind(m), 10000)
        })
    }
    setTimeout(function() {
        reply(msg, reminder);
    }, time);

    function isNumeric(n) {
        return !isNaN(parseFloat(n));
    }
};

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