exports.run = (bot, msg, params = []) => {
    msg.channel.sendMessage("http://www.textfixer.com/tools/random-choice.php")
};

exports.help = {
    name: "choice",
    description: "Does work by proxy",
    usage: "choice"
};

exports.conf = {
  enabled: true,
  aliases: ['choose'],
  permLevel: 0
};