exports.run = (bot, msg, params, config, perms = []) => {
    msg.delete();
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
            `[This message will disappear in 60 seconds]`,
            ``,
            `Use ${config.prefix}help <command> for details`,
            ``,
            `EVERYONE`,
            ...commandsForEveryone.map(command => {
                let help = command.help;
                return `${command.help.name} = ${help.description}`;
            })
        ];

        if (perms > 0) {
            message = message.concat([
                ``, `ADMIN`, ...commandsForAdmin.map(command => {
                    let help = command.help;
                    return `${command.help.name} = ${help.description}`;
                })
            ]);
        }
        if (perms > 2) {
            message = message.concat([
                ``, `OWNER`, ...commandsForOwner.map(command => {
                    let help = command.help;
                    return `${command.help.name} = ${help.description}`;
                })
            ]);
        }

        msg.channel.sendMessage([
            '```ini', ...message,
            '```'
        ]).then(m => {setTimeout(m.delete.bind(m), 60000)});

    } else {

        let command;
        if (bot.commands.has(params[0])) {
            command = params[0];
        } else if (bot.aliases.has(params[0])) {
            command = bot.aliases.get(params[0]);
        } else return false;
        command = bot.commands.get(command);
        msg.channel.sendMessage([
            '```ini', `[ Command: ${command.help.name} ]`, ``, `Description`, `= ${command.help.description || command.help.summary}`,
            ``,
            `Usage`,
            `= ${config.prefix}${command.help.usage}`,
            ``,
            `Aliases`,
            command.conf.aliases && command.conf.aliases.length ?
            command.conf.aliases.map(e => {
                return `= ${e}`
            }).join('\n') :
            `= N/A`,
            ``,
            `Permission`,
            command.conf.permLevel ?
            `= ${permLevelToWord(command.conf.permLevel)}` :
            '= Everyone',
            '```'
        ]).then(m => {setTimeout(m.delete.bind(m), 60000)});
    }
}

function permLevelToWord(permLvl) {
    if (!permLvl || permLvl === 0)
        return 'Everyone'
    if (permLvl === 2)
        return 'Admin';
    if (permLvl === 3)
        return 'Owner';
}

exports.help = {
    name: `help`,
    description: `Returns list of commands if no command specified; else returns help about a specific command.`,
    usage: `help [command]`
};

exports.conf = {
    enabled: true,
    aliases: ['userinfo'],
    permLevel: 0
};
