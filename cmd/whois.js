exports.run = (bot, msg, params = []) => {
    try {
        var checkuser = msg.mentions.users.first()
        var guilduser = msg.guild.members.get(checkuser.id)
    } catch (err) {
        msg.channel.sendMessage(`You didn't give me a user to analyze.`)
        return;
    }
    try {
        currentgame = (checkuser.presence.game.name.toString())
    } catch (err) {
        currentgame = "nothing"
    }
    var currentnick = (guilduser.nickname)
    if (!currentnick) {
      currentnick = "None"
    }

      let embed = {
				color: parseInt('89a1c4', 16),
				description: '❯ userinfo',
				fields: [{
					name: '❯ Member Information',
					value: `Joined server on: ${guilduser.joinedAt}
Roles: ${guilduser.roles.array()}
Nickname: ${currentnick}`,
					inline: true
				}, {
					name: '❯ User Information',
					value: `Username: ${checkuser.username}#${checkuser.discriminator}
Avatar URL: [Here](${checkuser.avatarURL})
Joined Discord on: ${checkuser.createdAt}
User ID: ${checkuser.id}
Currently playing: ${currentgame}
Status: ${checkuser.presence.status}
Bot?: ${checkuser.bot}`,
					inline: true
				}],
				thumbnail: {url: `${checkuser.avatarURL}`},
			};
msg.channel.sendMessage("", {
        embed
    }).catch(err => console.log(err));
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
