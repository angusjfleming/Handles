const util = require('util');
var fs = require("fs");

function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}

exports.run = (bot, msg, params = []) => {
    /*console.log(util.inspect(msg.member))*/
    /*console.log(permlvl)
    var code = params.join(" ");
    if (permlvl = 0) {msg.channel.sendMessage("`FAILED` ```xl\nThis command is reserved for the bot owner. \n```")} return;
    try {
        var evaled = eval(code);
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
        	msg.channel.sendMessage("`SUCCESS` ```xl\n" + evaled + "\n```");
        if (evaled.length > 2000) {
            msg.channel.sendMessage("Trying to eval: ` " + code + " ` failed because the output was greater than 2000 characters")
        }
        return;
        msg.channel.sendMessage("`SUCCESS` ```xl\n" + clean(evaled) + "\n```");
        msg.channel.sendMessage("`SUCCESS` ```xl\n" + clean(evaled) + "\n```");
    } catch (err) {
        msg.channel.sendMessage("`FAILED` ```xl\n" +
            clean(err) +
            "\n```");
    }*/

    var code = params.join(" ");
    try {
        if (eval(code) > 2000) {
            msg.channel.sendMessage("`FAILED` ```xl\n" + code + " `failed because the output was greater than 2000 characters")
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