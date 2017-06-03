module.exports = (bot, guildmember) => {
    if (typeof bot.guildconfigs[guildmember.guild.id].announcenewusers === undefined) {
        return;
    }
    if (bot.guildconfigs[guildmember.guild.id].announcenewusers == true) {
        guildmember.guild.defaultChannel.send(`<@${guildmember.user.id}> joined the server.`)
    }
    
};
