module.exports = (bot, Discord, fs) => {
    bot.commands = new Discord.Collection();
    bot.aliases = new Discord.Collection();
    fs.readdir("./cmd/", (err, files) => {
        if (err)
            console.error(err);
        console.log(`Loading commands.`);
        files.forEach(f => {
            let props = require(`../cmd/${f}`);
            bot.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name);
            });
        });
        console.log(`${files.length} commands loaded.`)
    });
};
