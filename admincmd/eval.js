const util = require('util');
var fs = require("fs");

function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}

exports.run = (bot, msg, params, owner = []) => {
    /*console.log(util.inspect(msg.member))*/
    var code = params.join(" ");
    if (msg.author.id != owner) return;
    try {
        var evaled = eval(code);
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
        if (evaled.length > 2000) {
            msg.channel.sendMessage("Trying to eval: ` " + code + " ` failed because the output was greater than 2000 characters")
        }
        return;
        msg.channel.sendMessage("```xl\n" + clean(evaled) + "\n```");
    } catch (err) {
        msg.channel.sendMessage("`ERROR` ```xl\n" +
            clean(err) +
            "\n```");
    }
};

exports.help = {
    name: "eval",
    description: "Evaluates js code",
    usage: "eval <code>"
};