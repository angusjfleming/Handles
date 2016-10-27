try {
    var Discord = require('discord.js');
} catch (e) {
    console.log("Please install discord.js")
}

const bot = new Discord.Client();
var ConfigFile = require("./config.json");
var prefix = ConfigFile.prefix;
var token = ConfigFile.bottoken;
var logging = ConfigFile.logging;
var fs = require("fs");
var mkdirp = require('mkdirp');
var masterlogloc = ConfigFile.masterlogloc;
var msgno = 0;
var commandrole = ConfigFile.commandrole
var owner = ConfigFile.owner
console.log(owner)

bot.login(token);

bot.on('ready', () => {
    startdate = new Date()
    console.log("Bot online (" + startdate + ")")
    bot.user.setGame("a dangerous game.")
});

const commands = new Map();
fs.readdir(`./cmd/`, (err, files) => {
    if (err) console.error(err);
    console.log(`Loading a total of ${files.length} commands.`);
    files.map(f => {
        let props = require(`./cmd/${f}`);
        console.log(`Loading Command: ${props.help.name}.`);
        commands.set(props.help.name, props);
    });
});

const admincommands = new Map();
fs.readdir(`./admincmd/`, (err, files) => {
    if (err) console.error(err);
    console.log(`Loading a total of ${files.length} admin commands.`);
    files.map(f => {
        let props = require(`./admincmd/${f}`);
        console.log(`Loading Admin Command: ${props.help.name}.`);
        admincommands.set(props.help.name, props);
    });
});

bot.on('message', msg => {
    if (msg.channel.type !== 'text') return;

    if (logging) {
        log(msg)
    }

    if (!msg.content.startsWith(prefix)) return;

    var command = msg.content.split(" ")[0].slice(prefix.length);
    var params = msg.content.split(" ").slice(1);
    var admin = false;

    if (commands.has(command)) {
        cmd = commands.get(command);
    } else if (admincommands.has(command)) {
        admin = true
        cmd = admincommands.get(command);
    }

    if (cmd && !admin) {
        cmd.run(bot, msg, params);
    } else if (msg.member.roles.find('name', commandrole) && admin && cmd || msg.author.id == owner && admin && cmd) {
        cmd.run(bot, msg, params, owner);
    } else {
        console.log("um")
    }
});

function log(msg) {
    formatguildname = ((msg.guild.name).replace(/[|&;$%@"<>()+,/\/]/g, ''))
    mkdirp('./logs/' + formatguildname, function(err) {})
    currentdate = new Date()
    writecontent = (currentdate.toUTCString() + " : " + msg.author.username + " said: \"" + msg.content + '\" in (' + msg.channel.name + ')\n')
    serverwritecontent = (currentdate.toUTCString() + " : " + msg.author.username + " said: \"" + msg.content + '\" in (' + msg.channel.name + ')' + ' in (' + msg.guild.name + ')\n')
    fs.appendFile("./logs/" + formatguildname + "/" + msg.channel.name + ".txt", writecontent, function(error) {});
    fs.appendFile("./logs/" + masterlogloc, serverwritecontent, function(error) {});
}

process.on("unhandledRejection", err => {
    console.log("Uncaught Promise Error: \n" + err.stack);
});