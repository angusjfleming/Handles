exports.run = (bot, msg) => {
    const collector = msg.channel.createCollector(m => m.author === msg.author, {
        time: 10000
    });
    msg.channel.sendMessage(`Are you sure?`);
    collector.on(`message`, m => {
        if (m.content === `no`)
            collector.stop(`aborted`);
        if (m.content === `yes`)
            collector.stop(`success`);
    });
    collector.on(`end`, (collected, reason) => {
        if (reason === `time`)
            return msg.channel.sendMessage(`The prompt timed out.`);
        if (reason === `aborted`)
            return msg.channel.sendMessage(`The reboot has been aborted`);
        if (reason === `success`) {
            msg.channel.sendMessage(`Rebooting...`).then(() => {
                bot.user.setGame(`Rebooting...`)
                process.exit();
            }).catch(e => {
                console.error(e);
            });
        }
    });
};

exports.help = {
    name: `reboot`,
    description: `Reboots the bot.`,
    usage: `reboot`
};

exports.conf = {
    enabled: true,
    aliases: ['restart'],
    permLevel: 3
};
