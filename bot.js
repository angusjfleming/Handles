try {
    var Discord = require("discord.js");
    var config = require("./config.json");
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var requireDir = require('require-dir');
    var AutoUpdater = require('auto-updater');
} catch (err) {
    console.log(`Failed to load dependency, ${err}`)
    return;
}

var autoupdater = new AutoUpdater({
 pathToJson: `package.json`,
 autoupdate: true,
 checkgit: true,
 jsonhost: 'raw.githubusercontent.com/realXIV/JSPublic/master/package.json',
 contenthost: 'github.com/realXIV/JSPublic/archive/master.zip',
 progressDebounce: 0,
 devmode: false
});

var bot = new Discord.Client();
var token = config.bottoken;
bot.ownerid = config.ownerid;
bot.prefix = config.prefix;
bot.hubchannel = config.hubid;
bot.funcs = requireDir("./funcs/");

bot.funcs.loadcmds(bot, Discord, fs);
bot.funcs.loadstorage(bot, fs)

bot.login(token);

bot.funcs.autoupdate(autoupdater)
setInterval(function() {
bot.funcs.autoupdate(autoupdater)
}, 3600000)

bot.on('ready', () => {
    bot.user.setGame(`@${bot.user.username} help`)
    startdate = new Date()
    console.log("Bot online (" + startdate + ")")
    setTimeout(function() {
    process.exit()
}, 3600000)
});

bot.on('disconnect', () => {
    console.log("Bot disconnected, trying to restart.")
    process.exit()
});

bot.on('guildCreate', guild => {
    console.log(`ADDED TO ${guild.name} (${guild.id})`)
});

bot.on('message', msg => {
    bot.funcs.logmessage(bot, msg)
    bot.funcs.onMessage(bot, msg)
});

process.on("unhandledRejection", err => {
    fs.appendFile("error.txt", err.stack + "\n", function(error) {});
    console.log("Unhandled Error: \n" + err.stack);
});
