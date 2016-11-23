var exec = require('child_process').exec;
exports.run = (bot, msg, params = []) => {
    var code = params.join(" ")
    var child = exec(code);
    child.stdout.on('data', function(data) {
        msg.channel.sendMessage(`\`\`\`${data}\`\`\``);
    });
    child.stderr.on('data', function(data) {
        msg.channel.sendMessage(`\`\`\`${data}\`\`\``);
    });
    child.on('close', function(code) {
        msg.channel.sendMessage(`\`closing code:\` ${code}`);
    });

};

exports.help = {
    name: `exec`,
    description: `Executes code on the host machine as if it were from a command
line`,
    usage: `exec <code>`
};

exports.conf = {
    enabled: true,
    aliases: ['ex'],
    permLevel: 3
};
