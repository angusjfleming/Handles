exports.run = (bot, msg, params, config = []) => {
    var error = false
    var code = params.join(" ");
    try {
        var evaled = eval(code);
    } catch (err) {
        error = true
        msg.channel.sendMessage("`FAILED` ```xl\n" + code + " failed with error: " + err + "\n```")
    }
    evaled = require('util').inspect(evaled);
    try {
        if (evaled.length > 2000 && error) {
            msg.channel.sendMessage("`FAILED` ```xl\n" + code + " failed because the output was greater than 2000 characters.```")
        } else if (!error){
            msg.channel.sendMessage("`SUCCESS` ```xl\n" + evaled + "\n```")
        }
    } catch (err) {
        console.log("this should never run")
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
