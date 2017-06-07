exports.run = (bot, msg, params = []) => {
    msg.delete()
    var dubya = msg.guild.members.find('id', '83864099842195456')
    dubya.setVoiceChannel(msg.guild.channels.filter(e => e.type === 'voice').random())
};

exports.conf = {
    aliases: ["gtfo"],
    permLevel: 3
};

exports.help = {
    name: `relocatew2`,
    description: `Gets w2 the fuck out of your voice channel`,
    usage: `relocatew2`
};
