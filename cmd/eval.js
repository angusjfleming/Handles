exports.run = (bot, msg, params = []) => {
    var code = params.join(" ");
    try {
        var evaled = eval(code);
    } catch (err) {
         return msg.channel.send(`:thumbsdown:\`\`\`xl\n'${code}' failed with error: ${err} \n\`\`\``);
    }
    evaled = require("util").inspect(evaled);
    try {
        if (evaled.length > 2000) {
            return msg.channel.send(`:thumbsdown:\`\`\`xl\n'${code}' failed because the output was greater than 2000 characters.\`\`\``);
        } else {
            return msg.channel.send(`:thumbsup:\`\`\`xl\n${evaled} \n\`\`\``);
        }
    } catch (err) {}
};

exports.help = {
    name: "eval",
    description: "Evaluates Javascript",
    usage: "eval <code>"
};

exports.conf = {
    enabled: true,
    aliases: ["ev"],
    permLevel: 4
};
