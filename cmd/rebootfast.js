exports.run = (bot, msg) => {
  msg.channel.sendMessage(`Rebooting...`)
  bot.user.setGame(`Rebooting... **quickly**`)
  process.exit();
}

exports.help = {
  name: `rebootfast`,
  description: `Reboots the bot. **fast**`,
  usage: `rebootfast`
};

exports.conf = {
  enabled: true,
  aliases: ['fastrestart', 'rebootfast', 'fast'],
  permLevel: 3
};
