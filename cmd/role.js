createrolearray = function(array, msg) {
    var rolearray = []
    array.forEach(element => {
        role = msg.guild.roles.find(val => val.id === element)
        if (role) {
            rolearray.push(role)
        }
    })
    return rolearray
}
exports.run = (bot, msg, params = []) => {
    if (msg.mentions.members.first() == bot.user) {
        msg.mentions.members.first().delete()
    }
    switch (params[0]) {
        case "add":
            var tagcontent = params.join(" ");
            try {
                msg.mentions.members.first().addRoles((msg.mentions.roles.array().length !== 0) ? msg.mentions.roles : createrolearray(params, msg))
            } catch (e) {
                console.log(e)
            }
            break;
        case "remove":
            try {
                msg.mentions.members.first().removeRoles((msg.mentions.roles.array().length !== 0) ? msg.mentions.roles : createrolearray(params, msg))
            } catch (e) {
                console.log(e)
            }
            break;
        default:
            console.log(nice)
    }
};

exports.help = {
    name: "role",
    description: "Allows admins to add/remove roles",
    usage: "role add/remove <user id / mention> <role id/mention/name>"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 3
};