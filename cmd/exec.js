var exec = require('child_process').exec;
exports.run = (bot, msg, params = []) => {
  var code = params.join(" ")
  exec(code, function(error, stdout, stderr) {
      msg.channel.sendMessage('stdout: ', stdout);
      msg.channel.sendMessage('stderr: ', stderr);
      if (error !== null) {
          msg.channel.sendMessage('exec error: ', error);
      }
  });
};

exports.help = {
    name: "exec",
    description: "Executes code on the host machine (Must be Linux based)",
    usage: "exec <code>"
};

exports.conf = {
    enabled: true,
    aliases: ['ex'],
    permLevel: 3
};
