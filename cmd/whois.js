exports.run = (bot, msg, params = []) => {
    try {
        var checkuser = msg.mentions.users.first()
        var guilduser = msg.guild.members.get(checkuser.id)
    } catch (err) {
        msg.channel.send(`You didn't give me a user to analyze.`)
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

    if (checkuser.avatarURL){
      var thumbneil = checkuser.avatarURL
      var ava = `[Here](${checkuser.avatarURL})`
    } else {
      var ava = "None"
      var thumbneil = ``;
    }

      let embed = {
				color: parseInt('FD5F00', 16),
				description: '❯ Userinfo',
				fields: [{
					name: '❯ Member Information',
					value: `Joined server on: ${guilduser.joinedAt}

Roles: \`${guilduser.roles.map(r => r.name).join('`\n`')}\`

Nickname: ${currentnick}`,
					inline: true
				}, {
					name: '❯ User Information',
					value: `Username: ${checkuser.username}#${checkuser.discriminator}

Avatar URL: ${ava}

Joined Discord on: ${checkuser.createdAt}

User ID: ${checkuser.id}

Currently playing: ${currentgame}

Status: ${checkuser.presence.status}

Bot?: ${checkuser.bot}`,
					inline: true
				}],
				thumbnail: {url: `${thumbneil}`},
			};
msg.channel.send("", {
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
