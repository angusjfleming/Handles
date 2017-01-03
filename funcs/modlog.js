module.exports = (msg, commandname, info, hex) => {
    try {
        var modlogchannel = msg.guild.channels.find('name', 'mod_log');
    } catch (err) {}
    return console.log(`LOGGING || Tried to modlog action but no mod_log channel was found.`);
    let embed = {
        "color": parseInt(hex, 16),
        "description": `​**Command:** ${commandname}
**Action:** ${info}`,
        "author": {
            "name": `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`,
            "icon_url": msg.author.avatarURL
        },
        "timestamp": msg.createdAt
    }
    modlogchannel.sendMessage("", {
        embed
    }).catch(err => msg.reply(err));
};
