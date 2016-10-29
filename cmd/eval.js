exports.run = (bot, msg, params = []) => {
    var code = params.join(" ");
    try {
        if (eval(code) > 2000) {
            msg.channel.sendMessage("`FAILED` ```xl\n" + code + " failed because the output was greater than 2000 characters.```")
        } else {
            msg.channel.sendMessage("`SUCCESS` ```xl\n" + eval(code) + "\n```")
        }
    } catch (err) {
        msg.channel.sendMessage("`FAILED` ```xl\n" + code + " failed with error: " + err + "\n```")
    }
};

exports.help = {
    name: "eval",
    description: "Evaluates js code",
    usage: "eval <code>"
};

exports.conf = {
  enabled: true,
  aliases: ['ev'],
  permLevel: 3
};