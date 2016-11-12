exports.run = (bot, msg, params = []) => {
  var choices = params.join(` `)
  var tokens = [].concat.apply([], choices.split('"').map(function(v, i) {
    return i % 2 ? v : v.split(' ')
  })).filter(Boolean);
  var choice = Math.floor(Math.random() * tokens.length);
  msg.channel.sendMessage(`My choice was: \`${tokens[choice]}\``)
};

exports.help = {
  name: `choice`,
  description: `Chooses between parameters entered. Multiple word choices must be contained with speech marks.`,
  usage: `choice <choices>`
};

exports.conf = {
  enabled: true,
  aliases: ['choose'],
  permLevel: 0
};
