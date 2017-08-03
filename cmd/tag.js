const sql = require("sqlite");
sql.open("./localdb.sqlite");
exports.run = (bot, msg, params = []) => {
    sql.run(`
CREATE TABLE IF NOT EXISTS tags (
	userid varchar(255),
	tagcontent varchar(255),
    tagname varchar(255),
    id INTEGER NOT NULL,
	PRIMARY KEY(id)
);`)
        .then(() => {
            if (!params[0]) return;
            var paramstemp = []
            params.forEach(function(element) {
                element = element.replace("@everyone", "ateveryone")
                element = element.replace("@here", "athere")
                paramstemp.push(element)
            });
            params = paramstemp

            switch (params[0]) {
                case "create":
                    params.shift()
                    var tagname = params[0]
                    params.shift()
                    console.log(params)
                    if (params[0] == undefined) {
                        msg.delete(5000)
                        return msg.channel.send("You entered no tag content.").then(m => {
                            setTimeout(m.delete.bind(m), 5000)
                        })
                    }
                    var tagcontent = params.join(" ")

                    sql.get("SELECT * FROM tags WHERE tagname=(?) AND userid=(?)", [tagname, msg.author.id]).then(row => {
                        if (!row && tagcontent != " ") {
                            sql.run("INSERT INTO tags (userid, tagcontent, tagname) VALUES( ?, ?, ?)", [msg.author.id, tagcontent, tagname])
                            msg.channel.send(`Created tag \`${tagname}\``)
                        } else {
                            msg.channel.send(`You already have a tag named \`${tagname}\`. You can use ${bot.prefix}tag update ${tagname} to change the content of your tag.`)
                        }
                    }).catch(() => {});
                    break;
                case "update":
                    params.shift()
                    var tagname = params[0]
                    params.shift()
                    if (params[0] == undefined) {
                        msg.delete(5000)
                        return msg.channel.send("You entered no tag content.").then(m => {
                            setTimeout(m.delete.bind(m), 5000)
                        })
                    }
                    var tagcontent = params.join(" ")
                    sql.get("SELECT * FROM tags WHERE tagname=(?) AND userid=(?)", [tagname, msg.author.id]).then(row => {
                        if (!row) {
                            msg.channel.send(`You have no tag named \`${tagname}\``)
                        } else {
                            sql.run("UPDATE tags SET tagcontent =(?) WHERE tagname=(?) AND userid=(?)", [tagcontent, tagname, msg.author.id]).then(() => {
                                msg.channel.send(`Updated tag \`${tagname}\`.`)
                            })
                        }
                    }).catch(() => {});
                    break;
                case "delete":
                    params.shift()
                    var tagname = params[0]
                    sql.get("SELECT * FROM tags WHERE tagname=(?) AND userid=(?)", [tagname, msg.author.id]).then(row => {
                        if (!row) {
                            msg.channel.send(`You have no tag named \`${tagname}\``)
                        } else {
                            sql.run("DELETE FROM tags WHERE tagname=(?) AND userid=(?)", [tagname, msg.author.id]).then(() => {
                                msg.channel.send(`Deleted tag \`${tagname}\``)
                            })
                        }
                    }).catch(() => {});
                    break;
                default:
                    var tagname = params[0]
                    sql.get("SELECT * FROM tags WHERE tagname=(?) AND userid=(?)", [tagname, msg.author.id]).then(row => {
                        if (!row) {
                            msg.delete(10000)
                            msg.channel.send(`You have no tag named \`${tagname}\``).then(m => {
                                setTimeout(m.delete.bind(m), 10000)
                            })
                        } else {
                            msg.channel.send(row.tagcontent)
                        }
                    }).catch(() => {});
            }
        })
};

exports.help = {
    name: `tag`,
    description: `Prints / creates / deletes a tag`,
    usage: `tag <tagname> | tag create <tagname>| tag delete <tag name>`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 1
};