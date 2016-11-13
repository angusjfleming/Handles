exports.run = (bot, msg, params = []) => {
  try {
    var checkuser = msg.mentions.users.first()
  } catch(err) {}
  try {
    var checkmention = msg.mentions.roles.first()
  } catch(err) {}
  console.log(msg.mentions.roles.members[0].user.username);
  console.log(checkuser);
    try {
        currentgame = (checkuser.presence.game.name.toString())
    } catch (err) {
        currentgame = "null"
    }
    if (checkuser){
        msg.channel.sendMessage(`\`\`\`xl\nAvatar URL: ${checkuser.avatarURL}\nUsername: ${checkuser.username}#${checkuser.discriminator}\nJoined on: ${checkuser.createdAt}\nUser ID: ${checkuser.id}\nCurrently playing: ${currentgame}\nStatus: ${checkuser.presence.status}\nBot?: ${checkuser.bot}\`\`\``);
      }
    if (checkmention){
      msg.channel.sendMessage("yes")
    }
};

exports.help = {
    name: `whois`,
    description: `Returns misc user info`,
    usage: `whois <usermention>`
};

exports.conf = {
  enabled: true,
  aliases: ['userinfo'],
  permLevel: 0
};
