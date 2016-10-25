try {
var Discord = require('discord.js');
} catch (e){
  console.log("Please install discord.js")
}

const bot = new Discord.Client();
var ConfigFile = require("./config.json");
var prefix = ConfigFile.prefix;
var token = ConfigFile.bottoken;
var fs = require("fs");
var mkdirp = require('mkdirp');
var masterlogloc = ConfigFile.masterlogloc;
var msgno = 0;

bot.login(token);

bot.on('ready', () => {
  startdate = new Date()
  console.log("Bot online (" + startdate + ")")
  bot.user.setStatus('online', "a dangerous game.")
});

const commands = new Map();
fs.readdir(`./cmd/`, (err, files) => {
  if(err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  files.map(f=> {
    let props = require(`./cmd/${f}`);
    console.log(`Loading Command: ${props.help.name}. :ok_hand:`);
    commands.set(props.help.name, props);
  });
});

bot.on('message', msg => {
  log(msg)

  if(!msg.content.startsWith(prefix)) return;
  if (msg.member.roles.find('name','Admin')){
  var command = msg.content.split(" ")[0].slice(prefix.length);
  var params = msg.content.split(" ").slice(1);
  if(commands.has(command)) {
    var cmd = commands.get(command);
    try {
    cmd.run(bot, msg, params);
    } catch(err) {
    msg.channel.sendMessage("```xl\nCommand '" + cmd.help.name + "' failed \nCorrect usage: " + cmd.help.usage + "```")
  }
  }
}
});

function log(msg){
  formatguildname = ((msg.guild.name).replace(/[|&;$%@"<>()+,/\/]/g,''))
  mkdirp('./logs/' + formatguildname, function (err) {})
  currentdate = new Date()
  writecontent = (currentdate.toUTCString() + " : " + msg.author.username + " said: \"" + msg.content + '\" in (' + msg.channel.name + ')\n')
  serverwritecontent = (currentdate.toUTCString() + " : " + msg.author.username + " said: \"" + msg.content + '\" in (' + msg.channel.name + ')' + ' in (' + msg.guild.name + ')\n')
  fs.appendFile("./logs/" + formatguildname + "/"+ msg.channel.name + ".txt", writecontent, function(error) {});
  fs.appendFile("./logs/" + masterlogloc, serverwritecontent, function(error) {});
}