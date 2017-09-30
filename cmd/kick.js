exports.run = (bot, msg, params = []) => {
    try {
        if (msg.mentions.users.has(bot.user)){
        var checkuser = msg.mentions.users.first(2)[1]
        } else {
        var checkuser = msg.mentions.users.first()
        var guilduser = msg.guild.members.get(checkuser.id)
        }
    } catch (err) {
        msg.channel.send(`You didn't give me a user to kick.`)
        return;
    }
    params.shift()
    if (guilduser.id === bot.ownerid) {
      return msg.channel.send("No")
    }
    guilduser.kick(params.join(" ")).then(() => {
        msg.channel.send(`Successfully kicked ${checkuser.tag}`)
    }).catch((err) => {
        msg.channel.send(`Failed to kick ${checkuser.tag}, make sure their highest role isn't higher than my highest role.`)
    })
};

exports.help = {
    name: `kick`,
    description: `Kicks a guild member.`,
    usage: `kick <usertag>`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 3
};
