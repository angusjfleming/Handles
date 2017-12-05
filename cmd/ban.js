exports.run = (bot, msg, params = []) => {
    try {
        if (msg.mentions.users.has(bot.user)){
        var checkuser = msg.mentions.users.first(2)[1];
        } else {
        var checkuser = msg.mentions.users.first();
        var guilduser = msg.guild.members.get(checkuser.id)
        }
    } catch (err) {
        msg.channel.send("You didn't give me a user to ban.")
        return;
    }
    params.shift()
    if (guilduser.id === bot.ownerid) {
      return msg.channel.send("No");
    }
    guilduser.ban(params.join(" ")).then(() => {
        msg.channel.send(`Successfully banned ${checkuser.tag}`);
    }).catch((err) => {
        msg.channel.send(`Failed to ban ${checkuser.tag}, make sure their highest role isn't higher than my highest role.`);
    })
};

exports.help = {
    name: "ban",
    description: "Bans a guild member.",
    usage: "ban <usertag>"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 3
};
