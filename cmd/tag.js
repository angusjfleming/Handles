const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./selfbot.sqlite');

exports.run = (bot, msg, params = []) => {
    db.serialize(function() {
        db.get(`SELECT * FROM tags WHERE name = '${params[0]}'`, (err, row) => {
            if (err) {
                log(err)
            }
            if (row) {
                message_content = msg.mentions.users.array().length === 1 ? `${msg.mentions.users.array()[0]} ${row.contents}` : row.contents;
                setTimeout(() => {
                    msg.reply(message_content);
                }, 20);
                db.run(`UPDATE tags SET used = used+1 WHERE name = '${params[0]}'`);
            } else msg.reply(`That tag doesn't exist`).then(setTimeout(msg.delete.bind(msg), 1000));
        });
    });
};

exports.help = {
    name: `tag`,
    description: `Send selected tag`,
    usage: `tag <tagname>`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 3
};
