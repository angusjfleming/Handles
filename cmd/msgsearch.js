exports.run = (bot, msg, params = []) => {
    msg.channel.fetchMessages({
            limit: 100
        })
        .then(messages => {
            msg_array = messages.array();
            console.log(msg_array)
            if (msg_array.includes(params.join(" "))) {
                console.log(msg_array.message.content)
            }
        }).catch(console.error);
};

exports.help = {
    name: `msgsearch`,
    description: `Searches through last 250 messages in each channel`,
    usage: `msgsearch`
};

exports.conf = {
  enabled: true,
  aliases: ['msearch'],
  permLevel: 3
};
