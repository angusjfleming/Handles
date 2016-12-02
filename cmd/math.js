var math = require('mathjs');
exports.run = (bot, msg, params = []) => {
    var error = false;
    var code = params.join(" ");
    try {
        var evaled = math.eval(code);
    } catch (err) {
      msg.channel.sendMessage(`Sorry bro, i just couldn\'t find it in me to maths that.
${err}`)
    }
    if (evaled) {
      msg.channel.sendMessage(msg.channel.sendMessage("`SUCCESS` ```xl\n" + evaled + "\n```"))
    }
};

exports.help = {
    name: `math`,
    description: `Evaluates maths`,
    usage: `math <maths>`
};

exports.conf = {
    enabled: true,
    aliases: ['calc'],
    permLevel: 1
};
