var exec = require('child_process').exec;
exports.run = (bot, msg, params = []) => {
  var code = params.join(" ")
  var child = exec(code);
  child.stdout.on('data', function(data) {
      msg.channel.sendMessage('stdout: ' + data);
  });
  child.stderr.on('data', function(data) {
      msg.channel.sendMessage('stdout: ' + data);
  });
  child.on('close', function(code) {
      msg.channel.sendMessage('closing code: ' + code);
  });

};

exports.help = {
    name: `exec`,
    description: `Executes code on the host machine (Must be Linux based)`,
    usage: `exec <code>`
};

exports.conf = {
    enabled: true,
    aliases: ['ex'],
    permLevel: 3
};
