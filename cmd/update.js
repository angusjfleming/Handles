var exec = require('child_process').exec;
exports.run = (bot, msg, params = []) => {
    exec(`git pull`, (e, stdout, stderr) => {
        if (e) {
            console.log(`=====GIT PULL FAILED=====
${e}`);
            msg.channel.sendMessage(`\`\`\`=====GIT PULL FAILED=====
${e}\`\`\``);
        } else {
            console.log(`=====GIT PULL SUCCESSFUL=====`);
            console.log(stdout);
            msg.channel.sendMessage(`\`\`\`=====GIT PULL SUCCESSFUL=====
${stdout}\`\`\``)
            console.error(stderr);
        }
    });
    exec(`npm install`, (e, stdout, stderr) => {
        if (e) {
            console.log(`=====DEPENDENCY INSTALL FAILED=====
${e}`);
            msg.channel.sendMessage(`\`\`\`=====DEPENDENCY INSTALL FAILED=====
${e}\`\`\``);
        } else {
            console.log("=====DEPENDENCY INSTALL COMPLETE=====");
            console.log(stdout);
            msg.channel.sendMessage(`\`\`\`=====DEPENDENCY INSTALL COMPLETE=====
${stdout}\`\`\``)
            console.error(stderr);
            msg.channel.sendMessage(`\`Updated complete, rebooting.\``).then(() => {
                process.exit();
            }).catch(e => {
                console.error(e);
            });
        }
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
    permLevel: 4
};
