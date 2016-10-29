exports.run = (bot, msg, params, config, perms = []) => {
        if (!params[0]) {
      let commands = bot.commands;
      let commandsForEveryone = commands.filter(e => {
        return !e.conf.permLevel || e.conf.permLevel === 0;
      });
      let commandsForAdmin = commands.filter(e => {
        return e.conf.permLevel === 2;
      });
      let commandsForOwner = commands.filter(e => {
        return e.conf.permLevel === 3;
      });

      let message = [
        `[ Commands List ]`,
        ``,
        `Use \`${config.prefix}help <command>\` for details`,
        ``,
        `EVERYONE`,
        ...commandsForEveryone.map(command => {
          let help = command.help;
          return `${command.help.name} = ${help.summary || help.description}`;
        })
      ];

      if (perms > 0) {
        message = message.concat([
          ``,
          `ADMIN`,
          ...commandsForAdmin.map(command => {
            let help = command.help;
            return `${command.help.name} = ${help.summary || help.description}`;
          })
        ]);
      }
      if (perms > 2) {
        message = message.concat([
          ``,
          `OWNER`,
          ...commandsForOwner.map(command => {
            let help = command.help;
            return `${command.help.name} = ${help.summary || help.description}`;
          })
        ]);
      }

      msg.channel.sendMessage([
        '```ini',
        ...message,
        '```'
      ]);

    } else {

      let command = params[0];
      if (!bot.commands.has(command)) return false;
      command = bot.commands.get(command);
      msg.channel.sendMessage([
        '```ini',
        `[ Command: ${command.help.name} ]`,
        ``,
        `Description`,
        `= ${command.help.description || command.help.summary}`,
        ``,
        `Usage`,
        `= ${config.prefix}${command.help.usage}`,
        ``,
        `Aliases`,
        command.conf.aliases && command.conf.aliases.length ? command.conf.aliases.map(e => {
          return `= ${e}`
        }).join('\n') : `= N/A`,
        ``,
        `Permission`,
        command.conf.permLevel ? `= ${permLevelToWord(command.conf.permLevel)}` : '= Everyone',
        '```'
      ]);
    }
}

function permLevelToWord(permLvl) {
    if (!permLvl || permLvl === 0) return 'Everyone'
    if (permLvl === 2) return 'Admin';
    if (permLvl === 3) return 'Owner';
  }

exports.help = {
    name: "help",
    description: "Returns list of commands if no command specified; else returns help about a specific command",
    usage: "#help [command]"
};

exports.conf = {
  enabled: true,
  aliases: ['userinfo'],
  permLevel: 0
};