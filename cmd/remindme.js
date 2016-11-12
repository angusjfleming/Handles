exports.run = (bot, msg, params = []) => {
    var minno = params[0]
        (mins) = parseInt(minno) * 60 * 1000;
    if (mins = "undefined") {
        msg.channel.sendMessage("You did not enter any parameters. **At all**.")
        return;
    }
    if (isNaN(mins)) {
        msg.channel.sendMessage(`${params[0]} is not a valid quantity of time.`)
        return;
    }
    params.shift();
    var reminder = params.join(" ")
    msg.channel.sendMessage(`Reminder for \`${reminder}\` set for ${minno} minute(s).`)
    setTimeout(function() {
        reply(msg, reminder);
    }, mins);
};

function reply(msg, reminder) {
    return msg.reply(` ${reminder}`)
};

exports.help = {
    name: "remindme",
    description: "Reminds you of x in y minutes",
    usage: "remindme"
};

exports.conf = {
    enabled: true,
    aliases: ['remind'],
    permLevel: 0
};
