exports.run = (bot, msg) => {
  msg.channel.sendMessage(`Rebooting...`).then(() => {
    exec("pm2 restart bot");
  }).catch(e => {
    console.error(e);
  });
}

exports.help = {
  name: `reboot`,
  description: `Reboots the bot. **fast**`,
  usage: `reboot`
};

exports.conf = {
  enabled: true,
  aliases: ['restart', 'reboot'],
  permLevel: 4
};
