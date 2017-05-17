const fs = require('fs')
const requireDir = require('require-dir');

module.exports = (bot, msg) => {
if (!fs.existsSync(`./logs`)){
    fs.mkdirSync(`./logs`);
}

setInterval(function(){
  if (fs.existsSync(`./logs/${msg.channel.id}write.json`)){
  fs.renameSync(`./logs/${msg.channel.id}write.json`, `./logs/${msg.channel.id}.json`, function (err) {
    console.log(err);
  });
}
}, 100)


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
        setTimeout(function(){
        something(bot, msg)
      }, 1000)
    });

}

function something(bot, msg) {
var obj = bot.logs[msg.channel.id]
var msgdata = [];
msgdata = {}
msgdata.author = msg.author;
msgdata.createdAt = msg.createdAt;
msgdata.content = msg.content;
msgdata.guildid = msg.guild.id;
msgdata.channelid = msg.channel.id;
obj[msg.id] = msgdata
fs.writeFile(`./logs/${msg.channel.id}write.json`, JSON.stringify(obj), function (err) {
  console.log(err);
});
}
