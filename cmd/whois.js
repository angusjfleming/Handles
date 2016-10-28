exports.run = (bot, msg, params = []) => {
    checkuser = msg.mentions.users.first()
    try {
        currentgame = (checkuser.presence.game.name.toString())
    } catch (err) {
        currentgame = "null"
    }
    try {
        msg.channel.sendMessage('```xl\nAvatar URL: ' + checkuser.avatarURL + '\nUsername: ' + checkuser.username + "#" + msg.guild.owner.user.discriminator + '\nJoined on: ' + checkuser.createdAt + '\nUser ID: ' + checkuser.id + '\nCurrently playing: ' + currentgame + '\nStatus: ' + checkuser.presence.status + '\nBot?: ' + checkuser.bot + '```');
    } catch (err) {}
};

exports.help = {
    name: "whois",
    description: "Returns misc user info",
    usage: "whois <usermention>"
};

exports.conf = {
  enabled: true,
  aliases: ['userinfo'],
  permLevel: 0
};