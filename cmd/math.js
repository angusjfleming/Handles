var math = require('mathjs');
exports.run = (bot, msg, params = []) => {
    var code = params.join(" ");
    try {
        var evaled = math.eval(code);
        msg.channel.send(`\`\`\`${evaled}\`\`\``)
    } catch (err) {
        response = randomElement(responses.matherr).replace("<<token>>", `${err}`)
        msg.channel.send(response)
    }
};

exports.help = {
    name: `math`,
    description: `Evaluates maths`,
    usage: `math <maths>`
};

exports.conf = {
    enabled: true,
    aliases: ['calc', 'maths'],
    permLevel: 1
};