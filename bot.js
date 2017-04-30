try {
    var Discord = require("discord.js");
    var config = require("./config.json");
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var requireDir = require('require-dir');
} catch (err) {
    var exec = require('child_process').exec;
    exec("npm install")
    console.log(`Failed to load dependency, ${err}`)
    return;
}

var bot = new Discord.Client();
var token = config.bottoken;
bot.ownerid = config.ownerid;
bot.prefix = config.prefix;
bot.hubchannel = config.hubid;
bot.funcs = requireDir("./funcs/");
var logs = requireDir("./localstorage/");

bot.funcs.loadcmds(bot, Discord, fs);

bot.login(token);

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
    bot.funcs.onMessage(bot, msg)
    //bot.funcs.logmessage(bot, msg, logs)
});

process.on("unhandledRejection", err => {
    fs.appendFile("error.txt", err.stack + "\n", function(error) {});
    console.log("Unhandled Error: \n" + err.stack);
});
