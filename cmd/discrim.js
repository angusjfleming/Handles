exports.run = (bot, msg, params = []) => {
    var userlist = bot.users.filter(u => u.discriminator === params[0]).map(e => e.username);
    msg.channel.send(`**Found ${userlist.length} users with the discriminator ${params[0]}**:
${userlist.join(", ")}
`);
};

exports.help = {
    name: "discrim",
    description: "Finds users with the discriminator specified.",
    usage: "discrim <value>"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 2
};
