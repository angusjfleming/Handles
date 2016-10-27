exports.run = (bot, msg, params = []) => {
  msg.channel.sendMessage('```xl\nName: ' + msg.guild.name + '\nIcon Url: ' + msg.guild.iconURL + '\nRegion: ' + msg.guild.region + '\nOwner: ' + msg.guild.owner.user.username + "#" + msg.guild.owner.user.discriminator +' (' + msg.guild.owner.user.id + ')\nCreation Date: '+ msg.guild.createdAt +'```');
};

exports.help = {
  name : "serverinfo",
  description: "Returns misc server info",
  usage: "serverinfo"
};