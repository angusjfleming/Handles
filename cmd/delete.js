var hex = "00ffff";
exports.run = (bot, msg, params = []) => {
    messagecount = parseInt(params[0]) ? parseInt(params[0]) : 1;
    msg.channel.fetchMessages({
            limit: 100
        })
        .then(messages => {
            msg_array = messages.array();
            if (messagecount + 1 > msg_array.length) {
                deletedno = msg_array.length;
                msg.channel.bulkDelete(msg_array)
            } else {
                deletedno = messagecount + 1;
                msg_array.length = messagecount + 1;
                msg.channel.bulkDelete(msg_array)
            }
            var info = `Deleted ${deletedno} messages in ${msg.channel.name}`
            bot.modlog(msg, exports.help.name, info, hex)
        }).catch(console.error);
};

exports.help = {
    name: "delete",
    description: "Deletes message(s) (up to 100)",
    usage: "delete <# of messages>"
};

exports.conf = {
    enabled: true,
    aliases: ['del', 'purge'],
    permLevel: 2
};
