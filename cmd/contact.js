exports.run = (bot, msg, params = []) => {
    var inv;
    channel = bot.guilds.get(bot.hubchannel).defaultChannel
    channel.createInvite()
        .then(invite => channel.sendMessage(`${msg.author.username}#${msg.author.discriminator} (${msg.author.id}) said: ${params.join(" ")}\n${invite.url}`))
        .catch(console.error)
};

exports.help = {
    name: "contact",
    description: "Contacts the bot owner",
    usage: "contact <message>"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 1
};
