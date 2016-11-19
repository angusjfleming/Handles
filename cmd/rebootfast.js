exports.run = (bot, msg) => {
            msg.channel.sendMessage(`Rebooting...`).then(() => {
                bot.user.setGame(`Rebooting...`)
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
    aliases: ['fastrestart', 'rebootfast', 'fast'],
    permLevel: 3
};
