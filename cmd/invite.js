exports.run = (bot, msg, params = []) => {
	msg.channel.sendMessage(`Invite for SOY: https://discordapp.com/oauth2/authorize?&client_id=168395434371448832&scope=bot&permissions=8`);
};

exports.help = {
    name: "invite",
    description: "Returns bot invite",
    usage: "invite"
};

exports.conf = {
  enabled: true,
  aliases: ['inv'],
  permLevel: 0
};
