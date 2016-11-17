exports.run = (bot, msg, params = []) => {
  try {
      var nickuser = msg.mentions.users.first()
      nickuser = msg.guild.member(nickuser)
  } catch (err) {
      msg.channel.sendMessage(`You didn't give me a user to analyze.`)
      return;
  }
  try {
    nickuser.setnickname(params.join(` `))
  } catch (err) {
    msg.reply(`Failed with error ${err}`)
  }
};

exports.help = {
    name: `nick`,
    description: `Sets a user's nickname`,
    usage: `nick <usermention> <newnickname>`
};

exports.conf = {
    enabled: true,
    aliases: ['setnickname'],
    permLevel: 2
};
