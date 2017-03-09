var math = require('mathjs');
exports.run = (bot, msg, params = []) => {
  var code = params.join(" ");
  try {
    var evaled = math.eval(code);
    msg.channel.sendMessage(`\`\`\`${evaled}\`\`\``)
  } catch (err) {
    msg.channel.sendMessage(`Sorry bro, i just couldn\'t find it in me to maths that.
${err}`)
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
