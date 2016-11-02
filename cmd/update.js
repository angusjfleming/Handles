const exec = require('child_process');

exports.run = (bot, msg, params, config = []) => {
    bot._exec('git pull').then((stdout) => {

      if (stdout.includes('Already up-to-date.')) {
        needsDependencies = false;
        let message = [
          '**UPDATE**',
          '',
          'No update available!'
        ];
        msg.channel.sendMessage(message);
        throw "No update";
      } else {
        let message = [
          '**UPDATE**',
          '',
          'Finished fetching update!',
          `\`git pull\``,
          '\`\`\`xl',
          stdout,
          '\`\`\`',
          'Installing dependencies...'
        ];

        return msg.channel.sendMessage(message)
      }
  })
};

exports.help = {
    name: "update",
    description: "Updates the entire bot. Everything.",
    usage: "update"
};

exports.conf = {
    enabled: true,
    aliases: [''],
    permLevel: 3
};