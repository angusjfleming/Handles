exports.run = (bot, msg, params = []) => {
    msg.channel.send(`Invite for ${bot.user.username}: https://discordapp.com/oauth2/authorize?&client_id=${bot.user.id}&scope=bot&permissions=8`).then(m => {setTimeout(m.delete.bind(m), 120000)});
};

exports.help = {
    name: "invite",
    description: "Returns bot invite",
    usage: "invite"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 1
};
