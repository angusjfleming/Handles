exports.run = (bot, msg, params = []) => {
    msg.channel.sendMessage(`\`\`\`xl\nName: ${msg.guild.name}
Icon Url: ${msg.guild.iconURL}
Region: ${msg.guild.region}
Owner: ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator} (${msg.guild.owner.user.id})
Creation Date: ${msg.guild.createdAt}\`\`\``);
};

exports.help = {
    name: "serverinfo",
    description: "Returns misc server info",
    usage: "serverinfo"
};

exports.conf = {
    enabled: true,
    aliases: ['svinfo'],
    permLevel: 1
};
