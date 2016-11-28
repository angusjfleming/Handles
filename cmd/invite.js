exports.run = (bot, msg, params = []) => {
    msg.channel.sendMessage(`Invite for SOY: https://discordapp.com/oauth2/authorize?&client_id=168395434371448832&scope=bot&permissions=8`).then(m => {setTimeout(m.delete.bind(m), 60000)});
};

exports.help = {
    name: `invite`,
    description: `Returns bot invite`,
    usage: `invite`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 1
};
