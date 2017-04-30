const fs = require('fs')
var requireDir = require('require-dir');

module.exports = (bot, msg, logs) => {
var idvar = msg.guild.id

if (!fs.existsSync(`./localstorage`)){
    fs.mkdirSync(`./localstorage`);
}

if (!fs.existsSync(`./localstorage/${msg.guild.id}.json`)){
    createjson(msg.guild.id)
}

setTimeout(function() {
var obj = logs.idvar
console.log(obj)
var msgdata = {};
msgdata[msg.id].author = msg.author;
msgdata[msg.id].createdAt = msg.createdAt;
msgdata[msg.id].content = msg.content;
obj.concat(msgdata)
console.log(obj)

fs.writeFile(`./localstorage/${msg.guild.id}.json`, JSON.stringify(obj), function (err) {
  console.log(err);
});
}, 500)
}

function createjson(jsonname) {
      fs.writeFile(`./localstorage/${jsonname}.json`, JSON.stringify({}), (err) => {
          if (err) console.log(err);
      });
}
