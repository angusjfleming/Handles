exports.run = (bot, msg, params = []) => {
  var commandname = exports.help.name;
  try {
      var nickuser = msg.mentions.users.first()
      nickuser = msg.guild.member(nickuser)
  } catch (err) {
      msg.channel.sendMessage(`You didn't give me a user to set the nickname of.`)
      return;
  }
  try {
    params.shift()
    nickuser.setNickname(params.join(` `))
    var info = `Set ${msg.mentions.users.first().username}#${msg.mentions.users.first().discriminator}\'s nickname to ${params.join(` `)}`;
    bot.modlog(msg, commandname, info)
  } catch (err) {
    msg.reply(`Failed with error ${err}`)
  }
};

exports.help = {
    name: `nickname`,
    description: `Sets a user's nickname. If no new nickname is written, the nickname will be reset.`,
    usage: `nickname <usermention> <newnickname>`
};

exports.conf = {
    enabled: true,
    aliases: ['nick'],
    permLevel: 2
};
