module.exports = (bot, guildmember) => {
    if (typeof bot.guildconfigs[guildmember.guild.id].announcenewusers === undefined) {
        return;
    }
    if (bot.guildconfigs[guildmember.guild.id].announcenewusers == true) {
        guildmember.guild.defaultChannel.send(`Welcome, <@${guildmember.user.id}> to ${msg.guild.name}!.`)
    }
    
};
