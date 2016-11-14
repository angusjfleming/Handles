var exec = require('child_process').exec;
exports.run = (bot, msg, params = []) => {
    var child = exec(`sudo git pull`);
    child.stdout.on('data', function(data) {
        msg.channel.sendMessage(`\`OUT:\` ${data}`);
    });
    child.stderr.on('data', function(data) {
        msg.channel.sendMessage(`\`ERR:\` ${data}`);
    });
    child.on('close', function(code) {
        msg.channel.sendMessage(`\`closing code:\` ${code}`);
    });

};

exports.help = {
    name: `update`,
    description: `**Guess**`,
    usage: `update`
};

exports.conf = {
    enabled: true,
    aliases: [''],
    permLevel: 3
};
