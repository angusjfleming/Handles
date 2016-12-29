var humanizeDuration = require('humanize-duration')
exports.run = (bot, msg, params = []) => {
    msg.channel.sendMessage(humanizeDuration(bot.uptime))
};

exports.help = {
    name: `uptime`,
    description: `Returns bot uptime`,
    usage: `uptime`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 3
};
