exports.run = (bot, msg, params = []) => {
  msg.delete()
    var minno = params[0]
    var mins = parseInt(minno) * 60 * 1000;
    if (isNaN(mins)) {
        msg.channel.sendMessage(`${params[0]} is not a valid quantity of time.`).then(m => {setTimeout(m.delete.bind(m), 10000)})
        return;
    }
    params.shift();
    var reminder = params.join(" ")
    if (!reminder){
      msg.reply(`Sorry bro, that won't fly here, you gotta be reminded of something. :eyes:`).then(m => {setTimeout(m.delete.bind(m), 10000)})
      return;
    }
    msg.reply(`Reminder for \`${reminder}\` set for ${minno} minute(s).`).then(m => {setTimeout(m.delete.bind(m), 10000)})
    setTimeout(function() {
        reply(msg, reminder);
    }, mins);
};

function reply(msg, reminder) {
    return msg.reply(`reminding you of \`${reminder}\` from ${msg.createdAt}`)
};

exports.help = {
    name: `remindme`,
    description: `Reminds you in x minutes of y`,
    usage: `remindme`
};

exports.conf = {
    enabled: true,
    aliases: ['remind'],
    permLevel: 1
};
