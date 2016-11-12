exports.run = (bot, msg, params = []) => {
  var secs = params[0]
  params.shift();
  var reminder = params.join(" ")
  msg.channel.sendMessage(`Reminder for ${reminder}, set for ${secs}`)
  setTimeout(msg.reply(` ${reminder}`), secs);
};

exports.help = {
    name: "remindme",
    description: "Reminds you of x in y seconds",
    usage: "remindme"
};

exports.conf = {
  enabled: true,
  aliases: ['remind'],
  permLevel: 0
};
