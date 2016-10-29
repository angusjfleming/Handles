exports.run = (bot, msg, params) => {
    if (!params[0]) {
      msg.channel.sendCode("asciidoc", `= Command List =\n\n[Use ~~help <commandname> for details]\n\n${bot.commands.map(c=>`${c.help.name}:: ${c.help.description} || Permlvl required:: ${c.conf.permLevel}`).join("\n")}`);
  } else {
    let command = params[0];
    if(bot.commands.has(command)) {
      command = bot.commands.get(command);
      msg.channel.sendCode("asciidoc", `= ${command.help.name} = \n${command.help.description}\nUsage: ${command.help.usage}\nAliases: ${command.conf.aliases}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['cmds'],
  permLevel: 0
};

exports.help = {
  name : "help",
  description: "Returns list of commands if no command specified; else returns help about a specific command",
  usage: "help [command]"
};