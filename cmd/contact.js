exports.run = (bot, msg, params = []) => {
    var inv;
    channel = bot.guilds.get(bot.hubchannel).defaultChannel
    msg.channel.createInvite()
        .then(invite => contact(invite, msg, channel, params))
        .catch(console.error)
};

function contact(invite, msg, channel, params){
    channel.sendMessage(`${msg.author.username}#${msg.author.discriminator} (${msg.author.id}) said: ${params.join(" ")}\n${invite.url}`)
    msg.delete()
    msg.reply(`Successfully contacted owner.`).then(m => {setTimeout(m.delete.bind(m), 10000)})
}

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
