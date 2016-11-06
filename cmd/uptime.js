function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  var uptimehms = (hrs + ':' + mins + ':' + secs);
}

exports.run = (bot, msg, params = []) => {
	msgToTime(bot.uptime)
	msg.channel.sendMessage(uptimehms)
};

exports.help = {
    name: "uptime",
    description: "Returns bot uptime",
    usage: "uptime"
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 2
};
