var hex = "551a8b";
exports.run = (bot, msg, params = []) => {
  msg.delete()
        try {
            var nickuser = msg.mentions.users.first();
            nickuser = msg.guild.member(nickuser);
        } catch (err) {
            msg.channel.send(`You didn't give me a user to set the nickname of.`);
            return;
        }
        try {
            params.shift();
            if (params.join(" ").length > 32) {
                msg.channel.send(`Nicknames cannot be longer than 32 characters`)
                return;
            }
            if (params.length == 0) {
                nickuser.setNickname(params.join(" "))
                var info = `Reset ${msg.mentions.users.first().username}\'s nickname.`
                msg.channel.send(info)
            } else {
                nickuser.setNickname(params.join(" "))
                var info = `Set ${msg.mentions.users.first()}\'s nickname to ${params.join(` `)}`;
                msg.channel.send(info)
    }
  } catch (err) {
    msg.channel.send(`Failed with error ${err}`)
  }
if (info){
  bot.funcs.modlog(msg, exports.help.name, info, hex);
}
};

exports.help = {
    name: "nickname",
    description: "Sets a users nickname. If no new nickname is written, the nickname will be reset.",
    usage: "nickname <usermention> <newnickname>"
};

exports.conf = {
    enabled: true,
    aliases: ["nick"],
    permLevel: 3
};
