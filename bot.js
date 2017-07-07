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


const sql = require("sqlite3");
var db = new sql.Database('msglogs.sqlite');


var bot = new Discord.Client();
var token = config.bottoken;
bot.ownerid = config.ownerid;
bot.prefix = config.prefix;
bot.hubchannel = config.hubid;
bot.hsapikey = config.hsapikey;
bot.funcs = requireDir("./funcs/");
bot.cardinfo = require("./hsinfo/cardinfo.json")
bot.cardnames = require("./hsinfo/cardnames.json")

bot.funcs.loadcmds(bot, Discord, fs);

bot.login(token);

bot.on('ready', () => {
    bot.user.setGame(`@${bot.user.username} help`)
    startdate = new Date()
    console.log(`Bot online: ${bot.user.username} ${startdate} `)
    setInterval(function() {
        bot.funcs.checkreminders(bot, fs)
    }, 5000)
});

bot.on('disconnect', () => {
    console.log("Bot disconnected, trying to restart.")
    process.exit()
});

bot.on('guildCreate', guild => {
    console.log(`ADDED TO ${guild.name} (${guild.id})`)
});


bot.on('message', msg => {
    if (msg.channel.type == 'dm' || msg.channel.type == "group" || msg.author == bot.user) return;
    bot.funcs.onMessage(bot, msg)
    db.run(`
CREATE TABLE IF NOT EXISTS msglogs (
	userid varchar(255),
	msgcontent varchar(255),
    usertag varchar(255),
	msgid varchar(255),
    guildid varchar(255),
    channelid varchar(255),
    createddate varchar(255),
	PRIMARY KEY(msgid)
);`);

    db.run("INSERT INTO msglogs (userid, msgcontent, usertag, msgid, guildid, channelid, createddate) VALUES( ?, ?, ?, ?, ?, ?, ?)", [msg.author.id, msg.content, msg.author.tag, msg.id, msg.guild.id, msg.channel.id, msg.createdAt])
});

process.on("unhandledRejection", err => {
    fs.appendFile("error.txt", err.stack + "\n", function(error) {});
    console.log("Unhandled Error: \n" + err.stack);
});