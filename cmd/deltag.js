const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../tags.sqlite');

exports.run = (bot, msg, params = []) => {
  db.serialize(function() {
    db.run(`DELETE FROM tags WHERE name = '${params[0]}'`, (err) => {
      if(err){msg.reply(err)}
      msg.reply(`The tag ${params[0]} has been deleted`).then(setTimeout(msg.delete.bind(msg), 1000));
    });
  });
};

exports.help = {
    name: `deltag`,
    description: `Deletes a tag`,
    usage: `deltag <tagname>`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 4
};
