module.exports = (bot, msg) => {
    bot.maindb.run(`
CREATE TABLE IF NOT EXISTS msglogs (
	userid varchar(255),
	msgcontent varchar(255),
    usertag varchar(255),
	msgid varchar(255),
    guildid varchar(255),
    channelid varchar(255),
    createddate varchar(255),
	PRIMARY KEY(msgid)
);`)
.then(() => {bot.maindb.run("INSERT INTO msglogs (userid, msgcontent, usertag, msgid, guildid, channelid, createddate) VALUES( ?, ?, ?, ?, ?, ?, ?)", [msg.author.id, msg.content, msg.author.tag, msg.id, msg.guild.id, msg.channel.id, msg.createdAt])
});
};