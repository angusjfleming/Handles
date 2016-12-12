exports.run = (bot, msg, params = []) => {
    msg.delete()
    msg.channel.sendMessage(`Invite for SOY: https://discordapp.com/oauth2/authorize?&client_id=251034567857799169&scope=bot&permissions=8`).then(m => {setTimeout(m.delete.bind(m), 120000)});
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
