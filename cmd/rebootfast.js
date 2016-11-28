exports.run = (bot, msg) => {
  msg.channel.sendMessage(`Rebooting...`).then(() => {
    process.exit();
  }).catch(e => {
    console.error(e);
  });
}

exports.help = {
  name: `rebootfast`,
  description: `Reboots the bot. **fast**`,
  usage: `rebootfast`
};

exports.conf = {
  enabled: true,
  aliases: ['restart', 'reboot'],
  permLevel: 4
};
