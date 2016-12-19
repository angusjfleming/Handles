var fs = require("fs");
exports.run = (bot, msg, params = []) => {
  if (!bot.notes[msg.author.id]) bot.notes[msg.author.id] = [];

  if (params[0] == "add" || params[0] == "append") {
    msg.delete()
    try {
      params.shift()
      bot.notes[msg.author.id].push(params.join(" "))
      msg.reply(`added note: \`${params.join(" ")}\``).then(m => {setTimeout(m.delete.bind(m), 10000)})
    } catch (e) {
      msg.reply(`Error adding note: \`${e}\``)
    }
    write(bot)
    return;
  };

  if (params[0] == "del" || params[0] == "delete") {
    msg.delete()
    if (params[1] == "all"){
      try {
        bot.notes[msg.author.id] = [];
        msg.reply(`deleted all notes.`).then(m => {setTimeout(m.delete.bind(m), 10000)})
      } catch (e) {
        msg.reply(`Error removing notes: ${e}`)
      }
      write(bot)
      return;
    }
    params.shift()
    var removepos = parseInt(params[0]) ? parseInt(params[0]) : 1;
    --removepos;
    try {
      bot.notes[msg.author.id].splice(removepos, 1)
      msg.reply(`deleted note: #${removepos++}`).then(m => {setTimeout(m.delete.bind(m), 10000)})
    } catch (e) {
      msg.reply(`Error removing note: \`${e}\``)
    }
    write(bot)
    return;
  };

  if (!params[0]) {
    msg.delete(600000)
    if (bot.notes[msg.author.id] == "") {
      msg.channel.sendMessage(`${msg.author.username}, you have no notes. :scream:`)
      return;
    }
    var message = "";
    bot.notes[msg.author.id].forEach(function(element, index) {
      message = message + `[${index + 1}] ${element}\n`;
    });
    msg.channel.sendMessage(`\`\`\`ini
[${msg.author.username}'s notes]

${message}\`\`\``).then(m => {setTimeout(m.delete.bind(m), 600000)})
  }
};

function write(bot) {
  fs.writeFile('./localstorage/notes.json', JSON.stringify(bot.notes), (err) => {if (err) console.log(err);});
}

exports.help = {
  name: `notes`,
  description: `Creates a note, use add or del to create notes, use no argument to view notes.`,
  usage: `notes add/del <note> | notes`
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 1
};
