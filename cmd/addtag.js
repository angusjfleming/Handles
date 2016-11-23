const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../tags.sqlite');

exports.run = (bot, msg, params = []) => {
  name = params[0];
  contents = params.slice(1).join(" ");
  db.serialize(function() {
    db.get(`SELECT * FROM tags WHERE name = '${params[0]}'`, (err, row) => {
      if(err){msg.reply(err)}
      if(!row) {
        var stmt = db.prepare(`INSERT INTO "tags" (name, contents) VALUES (?, ?)`);
        stmt.run(name, contents);
        stmt.finalize();
        msg.reply(`Tag was added: ${name}`).then(setTimeout(msg.delete.bind(msg), 1000));
      }
      else msg.reply(`Bitch that tag already exists`).then(setTimeout(msg.delete.bind(msg), 1000));
    });
  });
};

exports.help = {
    name: `addtag`,
    description: `Adds a tag`,
    usage: `addtag <tagname> <tagcontent>`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 4
};
