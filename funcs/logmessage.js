const fs = require('fs')
var requireDir = require('require-dir');

module.exports = (bot, msg) => {
if (!fs.existsSync(`./logs`)){
    fs.mkdirSync(`./logs`);
}


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
    });


setTimeout(function() {
var obj = bot.logs[msg.guild.id]
var msgdata = [];
msgdata = {}
msgdata.author = msg.author;
msgdata.createdAt = msg.createdAt;
msgdata.content = msg.content;
msgdata.guildid = msg.guild.id
msgdata.channelid = msg.channel.id
obj[msg.id] = msgdata

fs.writeFile(`./logs/${msg.guild.id}.json`, JSON.stringify(obj), function (err) {
  console.log(err);
});
}, 500)
}
