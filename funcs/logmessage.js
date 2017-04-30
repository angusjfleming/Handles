const fs = require('fs')
var requireDir = require('require-dir');

module.exports = (bot, msg) => {

var logs = requireDir("./localstorage/");

if (!fs.existsSync(`./localstorage`)){
    fs.mkdirSync(`./localstorage`);
}

if (!fs.existsSync(`./localstorage/${msg.guild.id}.json`)){
    createjson(msg.guild.id, msg)
}

var obj = logs.(msg.guild.id)
console.log(obj)
var msgdata = []
msgdata[msg.id][0] = msg.author;
msgdata[msg.id][1] = msg.createdAt;
msgdata[msg.id][2] = msg.content;
obj.concat(msgdata)
console.log(obj)

fs.writeFile(`./localstorage/${msg.guild.id}.json`, JSON.stringify(obj), function (err) {
  console.log(err);
});
}

function createjson(jsonname, msg) {
      fs.writeFile(`./localstorage/${jsonname}.json`, JSON.stringify({}), (err) => {
          if (err) console.log(err);
      });
}
