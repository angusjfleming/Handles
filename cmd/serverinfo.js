exports.run = (bot, msg, params = []) => {

    var guild = msg.guild;
    var channels = guild.channels;

    if (guild.iconURL) {
        var thumbneil = guild.iconURL
        var servericon = `[Here](${guild.iconURL})`
    } else {
        var servericon = "None"
        var thumbneil = ``;
    }

    let embed = {
        color: parseInt('079f41', 16),
        description: '❯ Server Info',
        fields: [{
            name: '❯ Server Information',
            value: `Server Name: ${guild.name}

Server ID: ${guild.id}

Owner: ${guild.owner.user.username}#${guild.owner.user.discriminator} (${guild.owner.user.id})

Members: ${guild.members.size}

Server Icon: ${servericon}

Creation Date: ${guild.createdAt}

Region: ${guild.region}`,
            inline: true
        }, {
            name: '❯ Channel Information',
            value: `Text Channels:
#${channels.filter(e => e.type === 'text').map(r => r.name).join('\n#')}
(${channels.filter(e => e.type === 'text').size} total)

Voice Channels:
${channels.filter(e => e.type === 'voice').map(r => r.name).join('\n')}
(${channels.filter(e => e.type === 'voice').size} total)`,
            inline: true
        }],
        thumbnail: {
            url: `${thumbneil}`
        },
    };
    msg.channel.sendMessage("", {
        embed
    }).catch(err => console.log(err));
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
