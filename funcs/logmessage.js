const fs = require('fs')
const requireDir = require('require-dir');
const safeJsonStringify = require('safe-json-stringify');

module.exports = (bot, msg) => {
    if (!fs.existsSync(`./logs`)) {
        fs.mkdirSync(`./logs`);
    }

    setInterval(function() {
        if (fs.existsSync(`./logs/${msg.channel.id}write.json`)) {
            fs.renameSync(`./logs/${msg.channel.id}write.json`, `./logs/${msg.channel.id}.json`, function(err) {
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
            bot.logs[msg.channel.id] = props;
        });
        setTimeout(function() {
            something(bot, msg)
        }, 1000)
    });

}

function something(bot, msg) {
    var obj
    if (fs.existsSync(`./logs/${msg.channel.id}.json`)) {
        obj = bot.logs[msg.channel.id]
    } else {
        obj = {}
    }
    msgdata = [];
    msgdata = {}
    msgdata.author = msg.author.tag;
    msgdata.authorid = msg.author.id
    msgdata.createdAt = msg.createdAt;
    msgdata.content = msg.content;
    msgdata.guildid = msg.guild.id;
    msgdata.channelid = msg.channel.id;
    obj[msg.id] = msgdata
    fs.writeFile(`./logs/${msg.channel.id}write.json`, safeJsonStringify(obj), function(err) {
        console.log(err);
        obj = {}
    });

}

process.on("unhandledRejection", err => {});