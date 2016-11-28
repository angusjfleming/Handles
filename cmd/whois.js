exports.run = (bot, msg, params = []) => {
    try {
        var checkuser = msg.mentions.users.first()
    } catch (err) {
        msg.channel.sendMessage(`You didn't give me a user to analyze.`)
        return;
    }
    try {
        currentgame = (checkuser.presence.game.name.toString())
    } catch (err) {
        currentgame = "null"
    }

    try {
        msg.channel.sendMessage(
            `\`\`\`xl\nAvatar URL: ${checkuser.avatarURL}
Username: ${checkuser.username}#${checkuser.discriminator}
Joined on: ${checkuser.createdAt}
User ID: ${checkuser.id}
Currently playing: ${currentgame}
Status: ${checkuser.presence.status}
Bot?: ${checkuser.bot}\`\`\``
        );
    } catch (err) {
        msg.channel.sendMessage(`You didn't give me a user to analyze.`)
    }
};

exports.help = {
    name: `whois`,
    description: `Returns misc user info`,
    usage: `whois <usermention>`
};

exports.conf = {
    enabled: true,
    aliases: ['userinfo'],
    permLevel: 1
};
