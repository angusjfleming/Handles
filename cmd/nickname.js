var hex = "551a8b";
exports.run = (bot, msg, params = []) => {
  msg.delete()
        try {
            var nickuser = msg.mentions.users.first()
            nickuser = msg.guild.member(nickuser)
        } catch (err) {
            msg.channel.send(`You didn't give me a user to set the nickname of.`)
            return;
        }
        try {
            params.shift()
            if (params.join(` `).length > 32) {
                msg.reply(`Nicknames cannot be longer than 32 characters`).then(m => {setTimeout(m.delete.bind(m), 5000)});
                return;
            }
            if (params.length == 0) {
                nickuser.setNickname(params.join(` `))
                var info = `Reset ${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator}\'s nickname.`
            } else {
                nickuser.setNickname(params.join(` `))
                var info = `Set ${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator}\'s nickname to ${params.join(` `)}`;
    }
  } catch (err) {
    msg.reply(`Failed with error ${err}`).then(m => {setTimeout(m.delete.bind(m), 5000)});
  }
if (info){
  bot.funcs.modlog(msg, exports.help.name, info, hex)
}
};

exports.help = {
    name: `nickname`,
    description: `Sets a users nickname. If no new nickname is written, the nickname will be reset.`,
    usage: `nickname <usermention> <newnickname>`
};

exports.conf = {
    enabled: true,
    aliases: ['nick'],
    permLevel: 3
};
