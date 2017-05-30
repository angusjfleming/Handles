const fs = require('fs')
const requireDir = require('require-dir');
const safeJsonStringify = require('safe-json-stringify');

module.exports = (bot, msg) => {
    if (!fs.existsSync(`./logs`)) {
        fs.mkdirSync(`./logs`);
    }

    setInterval(function() {
        if (fs.existsSync(`./logs/${msg.guild.id}write.json`)) {
            fs.renameSync(`./logs/${msg.guild.id}write.json`, `./logs/${msg.guild.id}.json`, function(err) {
                console.log(err);
            });
        }
    }, 50)


    bot.logs = [];
    fs.readdir("./logs/", (err, files) => {
        if (err)
            console.error(err);
        //console.log(`Loading ${files.length} log files.`);
        files.forEach(f => {
            let props = require(`../logs/${f}`);
            //console.log(` Loading log: ${f}`);
            bot.logs[msg.guild.id] = props;
        });
        setTimeout(function() {
            something(bot, msg)
        }, 1000)
    });

}

function something(bot, msg) {
    var obj
    if (fs.existsSync(`./logs/${msg.guild.id}.json`)) {
        obj = bot.logs[msg.guild.id]
    } else {
        obj = {}
    }
    var msgdata = [];
    msgdata = {}
    msgdata.author = msg.author.tag;
    msgdata.authorid = msg.author.id
    msgdata.createdAt = msg.createdAt;
    msgdata.content = msg.content;
    msgdata.guildid = msg.guild.id;
    msgdata.channelid = msg.channel.id;
    if (typeof msg.attachments.first() !== 'undefined' && msg.attachments.first().url) {
        msgdata.attachments = msg.attachments.first().url
    } else {
        msgdata.attachments = "";
    }
    obj[msg.id] = msgdata
    fs.writeFileSync(`./logs/${msg.guild.id}write.json`, safeJsonStringify(obj))

}

process.on("unhandledRejection", err => {});