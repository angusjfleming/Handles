try {
    var Discord = require("discord.js");
    var config = require("./config.json");
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    var requireDir = require("require-dir");
} catch (err) {
    var exec = require("child_process").exec;
    exec("npm install")
    console.log(`Failed to load dependency, ${err}`)
    return;
}

var bot = new Discord.Client();
var token = config.bottoken;
bot.ownerid = config.ownerid;
bot.prefix = config.prefix;
bot.hubchannel = config.hubid;
bot.hsapikey = config.hsapikey;
bot.mashapekey = config.mashapekey ? config.mashapekey : null
bot.funcs = requireDir("./funcs/");
global.responses = require("./responses.json")

bot.funcs.loadcmds(bot, Discord, fs);


const sql = require("sqlite");
sql.open("./localdb.sqlite", { Promise })
  .then(maindb => {
      bot.maindb = maindb
  })

bot.login(token);

bot.on("ready", () => {
    bot.user.setPresence({ activity: { name: `@${bot.user.username} help` }, status: 'online' })
    startdate = new Date();
    console.log(`Bot online: ${bot.user.username} ${startdate} `)
    setInterval(function() {
        bot.funcs.checkreminders(bot, fs);
    }, 5000);
});

bot.on("disconnect", () => {
    console.log("Bot disconnected, trying to restart.")
    bot.login(token);
});

bot.on("guildCreate", guild => {
    console.log(`ADDED TO ${guild.name} (${guild.id})`)
});


bot.on("message", msg => {
    if (msg.channel.type == "dm" || msg.channel.type == "group" || msg.author == bot.user) return;
    bot.funcs.onmessage(bot, msg)
    bot.funcs.logMessage(bot,msg)

});

bot.on("messageUpdate", (oldmsg, newmsg) => {
    if (newmsg.channel.type == "dm" || newmsg.channel.type == "group" || newmsg.author == bot.user) return;
    if (newmsg.edits.length > 2) return;
    bot.funcs.onMessage(bot, newmsg)
});

process.on("unhandledRejection", err => {
    fs.appendFile("error.txt", err.stack + "\n", function(error) {});
    console.log("Unhandled Error: \n" + err.stack);
});

randomElement = function(array) {
    return array[Math.floor(Math.random() * array.length)]
}
