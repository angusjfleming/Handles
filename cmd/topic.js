var hex = "ffa500";
exports.run = (bot, msg, params = []) => {
        try {
            if (params.join(` `).length > 1024) {
                msg.reply(`Topics cannot be greater than 1024 characters`)
                return;
            }
            if (params.length == 0) {
                msg.delete()
                msg.reply(`You have to *enter a new topic* for the topic to change. :eyes:`)
            } else {
                msg.delete()
                msg.channel.setTopic(params.join(` `))
                var info = `Set ${msg.channel.name}\'s topic to ${params.join(` `)}`;
    }
  } catch (err) {
    msg.reply(`Failed with error ${err}`)
  }
if (info){
  bot.modlog(msg, exports.help.name, info, hex)
}
};

exports.help = {
    name: `topic`,
    description: `Sets a channels topic. If no new nickname is written, the nickname will be reset.`,
    usage: `topic <newtopic>`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 2
};
