const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../tags.sqlite');

exports.run = (bot, msg, params = []) => {
  db.serialize(function() {
    db.all("SELECT * FROM tags", (err, rows) => {
      if(err){log(err)}
      msg.reply(`List of tags: ${rows.map(r => `${r.name} (${r.used})`).join(" ; ")}`);
    });
  });
};

exports.help = {
    name: `tags`,
    description: `Lists tags`,
    usage: `tags`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 3
};
