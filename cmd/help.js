exports.run = (bot, msg, params, perms = []) => {
    if (!params[0]) {
        let commands = bot.commands;
        let commandsForEveryone = commands.filter(e => {
            return !e.conf.permLevel || e.conf.permLevel === 1;
        });
        let commandsForAdmin = commands.filter(e => {
            return e.conf.permLevel === 3;
        });
        let commandsForOwner = commands.filter(e => {
            return e.conf.permLevel === 4;
        });

        let message = [
            `[ Commands List ]`,
            ``,
            `Use @${bot.user.username} help <command> for details`,
            ``,
            `[ EVERYONE ]`,
            ...commandsForEveryone.map(command => {
                let help = command.help;
                return `${command.help.name} = ${help.description}`;
            })
        ];

        if (perms > 1) {
            message = message.concat([
                ``, `[ ADMIN | Use help admin for further information. ]`,
                ...commandsForAdmin.map(command => {
                    let help = command.help;
                    return `${command.help.name} = ${help.description}`;
                })
            ]);
        }
        if (perms > 3) {
            message = message.concat([
                ``, `[ OWNER ]`, ...commandsForOwner.map(command => {
                    let help = command.help;
                    return `${command.help.name} = ${help.description}`;
                })
            ]);
        }

        msg.channel.sendMessage([
            '```ini', ...message,
            '```'
        ])

    } else {

        let command;
        if (params[0].toLowerCase() == `admin`) {
            msg.channel.sendMessage(['```ini', `[Admin Command Information]`,
                '',
                'Certain commands will send a log of the admin command that\'s been run. This requires a channel in your sever called #mod_log',
                '```'
            ])
        }
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
            `= ${bot.prefix}${command.help.usage}`,
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
        ])
    }
}

function permLevelToWord(permLvl) {
    if (!permLvl || permLvl === 1)
        return 'Everyone'
    if (permLvl === 3)
        return 'Admin';
    if (permLvl === 4)
        return 'Owner';
}

exports.help = {
    name: `help`,
    description: `Returns list of commands if no command specified; else returns help about a specific command.`,
    usage: `help [command]`
};

exports.conf = {
    enabled: true,
    aliases: ['command', 'commands'],
    permLevel: 1
};
