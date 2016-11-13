const now = require('performance-now');
exports.run = (bot, msg, params = []) => {
  let command;
  if (bot.commands.has(params[0])) {
    command = params[0];
  } else if (bot.aliases.has(params[0])) {
    command = bot.aliases.get(params[0]);
  }

  if (!command) {
    return msg.channel.sendMessage(`I cannot find the command: ${params[0]}`);
  } else {
    msg.channel.sendMessage(`Reloading: ${command}`)
    .then(m => {
      var startTime = now();
      bot.reload(command)
      .then(() => {
        var endTime = now();
        m.edit(`Successfully reloaded: ${command} in ${(endTime - startTime).toFixed(3)}ms.`);
      })
      .catch(e => {
        m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
      });
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r"],
  permLevel: 3
};

exports.help = {
  name: `reload`,
  description: `Reloads the command file, if it's been updated or modified.`,
  usage: `reload <commandname>`
};
