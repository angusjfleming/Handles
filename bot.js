try {
    var Discord = require("discord.js");
    var config = require("./config.json");
    var fs = require("fs");
    var mkdirp = require('mkdirp');
} catch (err) {
    console.log(`Failed to load dependency, ${err}`)
    return;
}

var bot = new Discord.Client();
var token = config.bottoken;
var commandrole = config.commandrole;
var ownerid = config.ownerid;
var prefix = config.prefix;

bot.login(token);

bot.on('ready', () => {
    bot.user.setGame()
    startdate = new Date()
    console.log("Bot online (" + startdate + ")")
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir("./cmd/", (err, files) => {
    if (err)
        console.error(err);
    console.log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
        let props = require(`./cmd/${f}`);
        console.log(` Loading Command: ${props.help.name}.`);
        bot.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});

bot.on('message', msg => {
    var prefixtrue = false;

    if (msg.content.startsWith(`<@!${bot.user.id}> `)) {
        msg.content = msg.content.replace('!', '');
    }

    if (msg.content.startsWith(prefix))
        prefixtrue = true;

    if (msg.channel.type !== 'text')
        return;

    if (msg.author.bot)
        return;

    if (!msg.content.startsWith(`<@${bot.user.id}> `) && !prefixtrue)
        return;

    if (prefixtrue) {
        var command = (msg.content.split(" ")[0].slice(prefix.length)).toLowerCase();
        var params = msg.content.split(" ").slice(1);
    } else {
        var command = (msg.content.split(" ")[1].slice(`<@${bot.user.id}>`)).toLowerCase();
        var params = msg.content.split(" ").slice(2);
    }

    let perms = bot.elevation(msg);
    let cmd;

    if (!command)
        return;

    if (bot.commands.has(command)) {
        cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
        cmd = bot.commands.get(bot.aliases.get(command));
    }

    if (cmd) {
        if (perms < cmd.conf.permLevel)
            return;
        cmd.run(bot, msg, params, config, perms);
    }
});

process.on("unhandledRejection", err => {
    fs.appendFile("error.txt", err.stack + "\n", function(error) {});
    console.log("Unhandled Error: \n" + err.stack);
});

bot.elevation = function(msg) {
    let permlvl = 1;
    let admin_role = msg.guild.roles.find("name", "Admin");
    if (admin_role && msg.member.roles.has(admin_role.id) || msg.author.id == msg.guild.owner.id)
        permlvl = 3;
    if (msg.author.id === ownerid)
        permlvl = 4;
    return permlvl;
};

bot.reload = function(command) {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./cmd/${command}`)];
            let cmd = require(`./cmd/${command}`);
            bot.commands.delete(command);
            bot.aliases.forEach((cmd, alias) => {
                if (cmd === command)
                    bot.aliases.delete(alias);
            });

            bot.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

bot.modlog = function(msg, commandname, info, hex) {
    try {
        var modlogchannel = msg.guild.channels.find('name', 'mod_log');
    } catch (err) {};
    let embed = {
        "color": parseInt(hex, 16),
        "description": `​**Command:** ${commandname}
**Action:** ${info}`,
        "author": {
            "name": `${msg.author.username}#${msg.author.discriminator} (${msg.author.id})`,
            "icon_url": msg.author.avatarURL
        },
        "timestamp": msg.createdAt
    }
    modlogchannel.sendMessage("", {
        embed
    }).catch(err => msg.reply(err));
};
