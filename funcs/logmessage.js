const fs = require('fs')

module.exports = (bot, msg) => {

if (!fs.existsSync(`./localstorage`)){
    fs.mkdirSync(`./localstorage`);
}

if (!fs.existsSync(`./localstorage/${msg.guild.id}.json`)){
    createjson(msg.guild.name)
}

setTimeout(function() {
var obj = require(`./localstorage/${msg.guild.id}.json`);
var dataadress = obj.length + 1
obj[dataadress][0] = msg.author;
obj[dataadress][1] = msg.createdAt;
obj[dataadress][2] = msg.id;
fs.writeFile(`./localstorage/${msg.guild.id}.json`, JSON.stringify(obj), function (err) {
  console.log(err);
});
}, 500);
}

function createjson(jsonname) {
      fs.writeFile(`localstorage/${jsonname}.json`, JSON.stringify({}), (err) => {
          if (err) console.log(err);
      });
}
