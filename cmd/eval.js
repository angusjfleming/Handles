exports.run = (bot, msg, params = []) => {
    var code = params.join(" ");
    try {
        var evaled = eval(code);
    } catch (err) {
        msg.channel.sendMessage(`:thumbsdown:\`\`\`xl\n'${code}' failed with error: ${err} \n\`\`\``)
        return;
    }
    evaled = require('util').inspect(evaled);
    try {
        if (evaled.length > 2000) {
            msg.channel.sendMessage(`:thumbsdown:\`\`\`xl\n'${code}' failed because the output was greater than 2000 characters.\`\`\``)
        } else {
            msg.channel.sendMessage(`:thumbsup:\`\`\`xl\n${evaled} \n\`\`\``)
        }
    } catch (err) {}
};

exports.help = {
    name: `eval`,
    description: `Evaluates Javascript`,
    usage: `eval <code>`
};

exports.conf = {
    enabled: true,
    aliases: ['ev'],
    permLevel: 4
};
