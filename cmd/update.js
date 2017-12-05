var exec = require("child_process").exec;
exports.run = (bot, msg, params = []) => {
    exec("git pull", (e, stdout, stderr) => {
        if (e) {
            console.log(`=====GIT PULL FAILED=====
${e}`);
            msg.channel.send(`\`\`\`=====GIT PULL FAILED=====
${e}\`\`\``);
        } else {
            console.log("=====GIT PULL SUCCESSFUL=====");
            console.log(stdout);
            msg.channel.send(`\`\`\`=====GIT PULL SUCCESSFUL=====
${stdout}\`\`\``)
            console.error(stderr);
        }
    });
    exec(`npm install`, (e, stdout, stderr) => {
        if (e) {
            console.log(`=====DEPENDENCY INSTALL FAILED=====
${e}`);
            msg.channel.send(`\`\`\`=====DEPENDENCY INSTALL FAILED=====
${e}\`\`\``);
        } else {
            console.log("=====DEPENDENCY INSTALL COMPLETE=====");
            console.log(stdout);
            msg.channel.send(`\`\`\`=====DEPENDENCY INSTALL COMPLETE=====
${stdout}\`\`\``)
            console.error(stderr);
            msg.channel.send(`\`Update complete, reloading commands.\``).then(() => {
              console.log("Update complete, rebooting.")
              process.exit();
            }).catch(e => {
                console.error(e);
            });
        }
    });

};

exports.help = {
    name: "update",
    description: "**Guess**",
    usage: "update"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 4
};
